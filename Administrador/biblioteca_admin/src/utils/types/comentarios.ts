import { LivroI } from "./livros";
import { UsuarioI } from "./usuarios"

export interface ComentarioI {
    id: number
    usuarioId: string
    usuario: UsuarioI
    livroId: number
    livro: LivroI
    descricao: string
    resposta: string | null
    createdAt: string
    updatedAt: string | null
}