import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { subDays } from "date-fns";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios);
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
  const { nome, email, telefone, instituicao, escolaridade, senha, admin } = req.body;

  if (!nome || !email || !telefone || !instituicao || !senha) {
    res.status(400).json({ erro: "Informe dados obrigatório!" });
    return;
  }

  const erros = validaSenha(senha);
  if (erros.length > 0) {
    res.status(400).json({ erro: erros.join("; ") });
    return;
  }

  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(senha, salt);

  try {
    const usuario = await prisma.usuario.create({
      data: { nome, email, telefone, instituicao, escolaridade, admin, senha: hash },
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json(error);
    console.log((error as Error).message);
  }
});

// ===================================================================
// ROTA DE LOGIN COM VERIFICAÇÃO DE PAGAMENTO
// ===================================================================
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const mensaPadrao = "Login ou senha incorretos";

  if (!email || !senha) {
    res.status(400).json({ erro: mensaPadrao });
    return;
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuario == null) {
      res.status(400).json({ erro: mensaPadrao });
      return;
    }

    if (bcrypt.compareSync(senha, usuario.senha)) {
      let inadimplente = false;

      if (!usuario.admin) {
        // --- INÍCIO DA VERIFICAÇÃO DE PAGAMENTO VENCIDO ---
        const dataAtual = new Date();
        // Usa a data de pagamento do usuário como referência para calcular 30 dias atrás
        const dataPagamento = usuario.diaPagamento;
        // Se a data de pagamento for nula ou inválida, consideramos que não há pagamentos vencidos
        // Usa date-nfs para setar o dia do mês atual com o dia de pagamento do usuário
        // e subtrai 30 dias para verificar se há pagamentos vencidos
        //
        const dataReferencia = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataPagamento);
        const maisDeTrintaDiasAtras = subDays(dataReferencia, 30);

        // Buscamos por pagamentos que pertencem a este usuário, que não estão pagos (pagarMensal: 0)
        // e cuja data de pagamento já passou. Como temos a data de pagamento fixa (dia do mês),
        // comparamos com a data de referência calculada acima.
        const foiPago = await prisma.pagamento.findMany({
          where: {
            usuarioId: usuario.id,
            pago: true,
            dataPagamento: {
              gte: maisDeTrintaDiasAtras, // lte = less than or equal (menor ou igual)
            },
          },
        });

        console.log("Pagamentos encontrados:", foiPago, maisDeTrintaDiasAtras, dataReferencia);

        // Se a busca retornar 1 ou mais pagamentos
        if (!foiPago.length) {
          inadimplente = true;
        }
      }

      // Se não houver pagamentos vencidos, o login prossegue normalmente.
      const token = jwt.sign(
        {
          admin_logado_id: usuario.id,
          admin_logado_nome: usuario.nome,
        },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        admin: usuario.admin,
        createdAt: usuario.createdAt,
        updatedAt: usuario.updatedAt,
        inadimplente,
        token,
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
    const usuario = await prisma.usuario.findUnique({
      where: { id: parsedId }, // Usando parsedId
    });

    if (usuario == null) {
      res.status(400).json({ erro: "Não cadastrado" });
      return;
    } else {
      res.status(200).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id/inadimplente", async (req, res) => {
  // Rota que consulta se o usuario está inadimplente ainda
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ erro: "ID inválido." });
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) }
    });

    if (!usuario) {
      return res.status(404)
        .json({ erro: "Usuário não encontrado" })
    }

    if (!usuario.admin) {
      const dataAtual = new Date();
      // Usa a data de pagamento do usuário como referência para calcular 30 dias atrás
      const dataPagamento = usuario.diaPagamento;
      // Se a data de pagamento for nula ou inválida, consideramos que não há pagamentos vencidos
      // Usa date-nfs para setar o dia do mês atual com o dia de pagamento do usuário
      // e subtrai 30 dias para verificar se há pagamentos vencidos
      //
      const dataReferencia = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataPagamento);
      const maisDeTrintaDiasAtras = subDays(dataReferencia, 30);

      // Buscamos por pagamentos que pertencem a este usuário, que não estão pagos (pagarMensal: 0)
      // e cuja data de pagamento já passou. Como temos a data de pagamento fixa (dia do mês),
      // comparamos com a data de referência calculada acima.
      const foiPago = await prisma.pagamento.findMany({
        where: {
          usuarioId: usuario.id,
          pago: true,
          dataPagamento: {
            gte: maisDeTrintaDiasAtras, // lte = less than or equal (menor ou igual)
          },
        },
      });

      return res.json({ inadimplente: !foiPago.length })
    } else {
      return res.json({ inadimplente: false })
    }
  } catch (error: any) {
    res.status(500).json({ erro: "Erro ao verificar usuário." });
  }
})

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
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: Number(id) },
    });

    if (!usuarioExistente) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    // Deleta todas as reservas associadas ao cliente
    const reservasDeletadas = await prisma.reserva.deleteMany({
      where: { usuarioId: Number(id) },
    });

    console.log("Reservas deletadas:", reservasDeletadas);

    // Deleta todos os empréstimos associados ao cliente
    const emprestimosDeletados = await prisma.emprestimo.deleteMany({
      where: { usuarioId: Number(id) },
    });

    console.log("Empréstimos deletados:", emprestimosDeletados);

    // Tenta deletar o usuário
    const usuarioDeletado = await prisma.usuario.delete({
      where: { id: Number(id) },
    });

    console.log("Usuário deletado:", usuarioDeletado);
    res.status(200).json(usuarioDeletado);
  } catch (error: any) {
    console.error("Erro ao deletar usuário:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }
    res.status(500).json({ erro: "Erro ao deletar usuário." });
  }
});

export default router;
