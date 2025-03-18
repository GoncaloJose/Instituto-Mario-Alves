import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = Router();

// Rota para buscar todos os cadastros
router.get("/", async (req, res) => {
  try {
    const cadastros = await prisma.cadastro.findMany();
    res.status(200).json(cadastros);
  } catch (error) {
    console.error("Erro ao buscar cadastros:", error);
    res.status(400).json({ erro: "Erro ao buscar cadastros" });
  }
});

// Rota para criar um novo cadastro
router.post("/", async (req, res) => {
  const { email, senha, confirmaSenha, nome, escolaridade, telefone, instituicao } = req.body;

  // Valida campos obrigatórios
  if (!email || !senha || !confirmaSenha || !nome || !escolaridade || !telefone || !instituicao) {
    return res.status(400).json({
      erro: "Informe email, senha, confirmaSenha, nome, escolaridade, telefone e instituicao.",
    });
  }

  // Verifica se as senhas coincidem
  if (senha !== confirmaSenha) {
    return res.status(400).json({ erro: "As senhas não coincidem." });
  }

  try {
    // Verifica se o e-mail já está cadastrado
    const emailExistente = await prisma.cadastro.findUnique({
      where: { email },
    });

    if (emailExistente) {
      return res.status(400).json({ erro: "E-mail já cadastrado." });
    }

    // Criptografa a senha
    const hashedSenha = await bcrypt.hash(senha, 10);

    // Cria o cadastro no banco de dados
    const cadastro = await prisma.cadastro.create({
      data: {
        email,
        senha: hashedSenha,
        confirmaSenha,
        nome,
        escolaridade,
        telefone,
        instituicao,
      },
    });

    // Gera o token JWT
    const token = jwt.sign(
      { id: cadastro.id, email: cadastro.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      mensagem: "Cadastro realizado com sucesso.",
      cliente: {
        id: cadastro.id,
        nome: cadastro.nome,
        email: cadastro.email,
      },
      token, // Retorna o token para login automático
    });
  } catch (error) {
    console.error("Erro ao criar cadastro:", error);
    res.status(400).json({ erro: "Erro ao criar cadastro" });
  }
});

// Rota para deletar um cadastro por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cadastros = await prisma.cadastro.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(cadastros);
  } catch (error) {
    console.error("Erro ao deletar cadastro:", error);
    res.status(400).json({ erro: "Erro ao deletar cadastro" });
  }
});

export default router;

