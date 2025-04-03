import { UsuarioI } from "./usuarios";
import { LivroI } from "./livros";

export interface ComentarioI {
    id: number
    usuario: UsuarioI
    usuarioId: number
    livroId: number
    livro: LivroI
    descricao: string
    resposta: string | null
    createdAt: string
    updatedAt: string | null
}