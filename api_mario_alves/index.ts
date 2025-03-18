import express from 'express'
import cors from 'cors'

import livrosRoutes from './routes/livros'
import clientesRoutes from './routes/clientes'
import reservasRoutes from './routes/reservas'
import comentariosRoutes from './routes/comentarios'
import fotosRoutes    from './routes/fotos'
import historicosRoutes   from './routes/historicos'
import adminsRoutes from './routes/admins'
import dashboardRoutes from './routes/dashboard'
import cadastrosRoutes from './routes/cadastros'
import renovacoesRoutes from './routes/renovacoes'


const app = express()
const port = 3004

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use("/livros", livrosRoutes)
app.use("/clientes", clientesRoutes)
app.use("/reservas", reservasRoutes)
app.use("/comentarios", comentariosRoutes)
app.use("/fotos", fotosRoutes)
app.use("/historicos", historicosRoutes)
app.use("/admins", adminsRoutes)
app.use("/dashboard", dashboardRoutes)
app.use("/cadastros", cadastrosRoutes)
app.use("/renovacoes", renovacoesRoutes)

app.get('/', (req, res) => {
  res.send('API: Biblioteca IMA')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})