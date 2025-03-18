import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(400).json(error);
  }
});

function validaSenha(senha: string) {
  const mensa: string[] = [];

  // .length: retorna o tamanho da string (da senha)
  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres");
  }

  // contadores
  let pequenas = 0;
  let grandes = 0;
  let numeros = 0;
  let simbolos = 0;

  // percorre as letras da variável senha
  for (const letra of senha) {
    // expressão regular
    if (/[a-z]/.test(letra)) {
      pequenas++;
    } else if (/[A-Z]/.test(letra)) {
      grandes++;
    } else if (/[0-9]/.test(letra)) {
      numeros++;
    } else {
      simbolos++;
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    mensa.push(
      "Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos"
    );
  }

  return mensa;
}

router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    res.status(400).json({ erro: "Informe nome, email e senha" });
    return;
  }

  const erros = validaSenha(senha);
  if (erros.length > 0) {
    res.status(400).json({ erro: erros.join("; ") });
    return;
  }

  // 12 é o número de voltas (repetições) que o algoritmo faz para gerar o salt (sal/tempero)
  const salt = bcrypt.genSaltSync(12);
  // gera o hash da senha acrescida do salt
  const hash = bcrypt.hashSync(senha, salt);

  // para o campo senha, atribui o hash gerado
  try {
    const cliente = await prisma.cliente.create({
      data: { nome, email, senha: hash },
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  // em termos de segurança, o recomendado é exibir uma mensagem padrão
  // a fim de evitar de dar "dicas" sobre o processo de login para hackers
  const mensaPadrao = "Login ou senha incorretos";

  if (!email || !senha) {
    res.status(400).json({ erro: mensaPadrao });
    return;
  }

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email },
    });

    if (cliente == null) {
      res.status(400).json({ erro: mensaPadrao });
      return;
    }

    // se o e-mail existe, faz-se a comparação dos hashs
    if (bcrypt.compareSync(senha, cliente.senha)) {
      // se confere, gera e retorna o token
      res.status(200).json({
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
      });
    } else {
      res.status(400).json({ erro: mensaPadrao });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id, 10); // Convertendo o id para número

  if (isNaN(parsedId)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: parsedId }, // Usando parsedId
    });

    if (cliente == null) {
      res.status(400).json({ erro: "Não cadastrado" });
      return;
    } else {
      res.status(200).json({
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// Rota para deletar um cliente por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Verifica se o ID é válido
  if (isNaN(Number(id))) {
    return res.status(400).json({ erro: "ID inválido." });
  }

  try {
    console.log("Tentando deletar o cliente com ID:", id);

    // Verifica se o cliente existe
    const clienteExistente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });

    if (!clienteExistente) {
      return res.status(404).json({ erro: "Cliente não encontrado." });
    }

    // Deleta todas as reservas associadas ao cliente
    const reservasDeletadas = await prisma.reserva.deleteMany({
      where: { clienteId: Number(id) },
    });

    console.log("Reservas deletadas:", reservasDeletadas);

    // Deleta todos os históricos associados ao cliente
    const historicosDeletados = await prisma.historico.deleteMany({
      where: { clienteId: Number(id) },
    });

    console.log("Históricos deletados:", historicosDeletados);

    // Tenta deletar o cliente
    const clienteDeletado = await prisma.cliente.delete({
      where: { id: Number(id) },
    });

    console.log("Cliente deletado:", clienteDeletado);
    res.status(200).json(clienteDeletado);
  } catch (error: any) {
    console.error("Erro ao deletar cliente:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ erro: "Cliente não encontrado." });
    }
    res.status(500).json({ erro: "Erro ao deletar cliente." });
  }
});

export default router;
