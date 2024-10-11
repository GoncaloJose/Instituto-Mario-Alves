import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import nodemailer from "nodemailer";

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const comentarios = await prisma.comentario.findMany({
      include: {
        cliente: true,
        livro: true
      }
    })
    res.status(200).json(comentarios)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: "Unknown error" })
    }
  }
})

router.post("/", async (req, res) => {
  const { clienteId, livroId, descricao } = req.body

  if (!clienteId || !livroId || !descricao) {
    res.status(400).json({ erro: "Informe clienteId, livroId, descricao" })
    return
  }

  try {
    const comentario = await prisma.comentario.create({
      data: { clienteId, livroId, descricao }
    })
    res.status(201).json(comentario)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: "Unknown error" })
    }
  }
})

async function enviaEmail(nome: string, email: string, descricao: string, resposta: string) {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "e548ba0b8d9f05",
      pass: "********bc4a",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: 'goncalojose_cafe@yahoo.com.br', // sender address
      to: email, // list of receivers
      subject: "Re: Comentário do Libro", // Subject line
      text: resposta, // plain text body
      html: `<h2>Biblioteca IMA: ${nome}</h2>
             <h3>Comentário: ${descricao}</h3>
             <h3>Resposta: ${resposta}</h3>
             <p>Obrigado pelo Comentário o Instituto Mário Alves agradece!!</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

  } catch (error) {
    console.log(error)
  }
}

router.patch("/:id", async (req, res) => {
  const { id } = req.params
  const { resposta } = req.body

  if (!resposta) {
    res.status(400).json({ erro: "Informe a resposta do cliente" })
    return
  }

  try {
    const comentario = await prisma.comentario.update({
      where: { id: Number(id) },
      data: { resposta }
    })

    const dados = await prisma.comentario.findUnique({
      where: { id: Number(id) },
      include: {
        cliente: true,
      }
    })

    if (dados && dados.cliente && dados.descricao) {
      await enviaEmail(dados.cliente.nome, dados.cliente.email, dados.descricao, resposta)
    }

    res.status(200).json(comentario)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: "Unknown error" })
    }
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const comentario = await prisma.comentario.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(comentario)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: "Unknown error" })
    }
  }
})

router.get("/:clienteId", async (req, res) => {
    const { clienteId } = req.params
    try {
      const propostas = await prisma.comentario.findMany({
        where: { clienteId },
        include: {
          livro: true
        }
      })
      res.status(200).json(propostas)
    } catch (error) {
      res.status(400).json(error)
    }
  })

export default router

