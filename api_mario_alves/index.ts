import express from 'express'
import cors from 'cors'

import livrosRoutes from './routes/livros'
import clientesRoutes from './routes/clientes'
import reservasRoutes from './routes/reservas'
import comentariosRoutes from './routes/comentarios'

const app = express()
const port = 3004

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use("/livros", livrosRoutes)
app.use("/clientes", clientesRoutes)
app.use("/reservas", reservasRoutes)
app.use("/comentarios", comentariosRoutes)

app.get('/', (req, res) => {
  res.send('API: Biblioteca IMA')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})