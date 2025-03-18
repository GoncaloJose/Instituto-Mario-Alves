import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const admins = await prisma.admin.findMany()
    res.status(200).json(admins)
  } catch (error) {
    res.status(400).json(error)
  }
})

function validaSenha(senha: string) {
  const mensa: string[] = []

  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
  }

  let pequenas = 0
  let grandes = 0
  let numeros = 0
  let simbolos = 0

  for (const letra of senha) {
    if ((/[a-z]/).test(letra)) {
      pequenas++
    } else if ((/[A-Z]/).test(letra)) {
      grandes++
    } else if ((/[0-9]/).test(letra)) {
      numeros++
    } else {
      simbolos++
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
  }

  return mensa
}

router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha) {
    res.status(400).json({ erro: "Informe nome, email e senha" })
    return
  }

  const erros = validaSenha(senha)
  if (erros.length > 0) {
    res.status(400).json({ erro: erros.join("; ") })
    return
  }

  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(senha, salt)

  try {
    const admin = await prisma.admin.create({
      data: { nome, email, senha: hash }
    })
    res.status(201).json(admin)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/login", async (req, res) => {
  const { email, senha } = req.body

  const mensaPadrao = "Login ou senha incorretos"
  if (!email || !senha) {
    res.status(400).json({ erro: mensaPadrao })
    return
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email }
    })

    if (admin == null) {
      res.status(400).json({ erro: mensaPadrao })
      return
    }

    if (bcrypt.compareSync(senha, admin.senha)) {
      const token = jwt.sign({
        admin_logado_id: admin.id,
        admin_logado_nome: admin.nome
      },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" })
      
      res.status(200).json({id: admin.id, nome: admin.nome, token })
    } else {
      res.status(400).json({ erro: mensaPadrao })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const admins = await prisma.admin.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(admins);
  } catch (error) {
    console.error("Erro ao deletar reserva:", error);
    res.status(400).json({ erro: "Erro ao deletar reserva" });
  }
});

export default router


