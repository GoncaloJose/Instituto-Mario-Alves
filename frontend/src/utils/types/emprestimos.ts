import { UsuarioI } from "./usuarios"
import { LivroI } from "./livros"

export interface EmprestimoI {
    id: number
    usuarioId: number
    usuario: UsuarioI
    livroId: number
    livro: LivroI
    titulo: string
    datadaReserva: Date
    status: string
    datadaEntrega: Date
}