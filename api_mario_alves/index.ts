import express from 'express'
import cors from 'cors'

import livrosRoutes from './routes/livros'
import usuariosRoutes from './routes/usuarios'
import reservasRoutes from './routes/reservas'
import comentariosRoutes from './routes/comentarios'
import historicosRoutes   from './routes/historicos'
import dashboardRoutes from './routes/dashboard'
import renovacoesRoutes from './routes/renovacoes'


const app = express()
const port = 3004

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use("/livros", livrosRoutes)
app.use("/usuarios", usuariosRoutes)
app.use("/reservas", reservasRoutes)
app.use("/comentarios", comentariosRoutes)
app.use("/historicos", historicosRoutes)
app.use("/dashboard", dashboardRoutes)
app.use("/renovacoes", renovacoesRoutes)

app.get('/', (req, res) => {
  res.send('API: Biblioteca IMA')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})