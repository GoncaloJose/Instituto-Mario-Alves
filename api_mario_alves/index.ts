import express from 'express'
import cors from 'cors'

import livrosRoutes from './routes/livros'
import usuariosRoutes from './routes/usuarios'
import reservasRoutes from './routes/reservas'

import emprestimosRoutes   from './routes/emprestimos'
import dashboardRoutes from './routes/dashboard'
import renovacoesRoutes from './routes/renovacoes'
import autoresRoutes from './routes/autores'
import generosRoutes from './routes/generos'
import editorasRoutes from './routes/editoras'
import pagamentosRoutes from './routes/pagamentos'


const app = express()
const port = 3004

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/livros", livrosRoutes)
app.use("/usuarios", usuariosRoutes)
app.use("/reservas", reservasRoutes)

app.use("/emprestimos", emprestimosRoutes)
app.use("/dashboard", dashboardRoutes)
app.use("/renovacoes", renovacoesRoutes)
app.use("/autores", autoresRoutes)
app.use("/generos", generosRoutes)
app.use("/editoras", editorasRoutes)
app.use("/pagamentos", pagamentosRoutes)

app.get('/', (req, res) => {
  res.send('API: Biblioteca IMA')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
