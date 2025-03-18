import { LivroI } from "./livros";
import { ClienteI } from "./clientes"

export interface ComentarioI {
    id: number
    clienteId: string
    cliente: ClienteI
    livroId: number
    livro: LivroI
    descricao: string
    resposta: string | null
    createdAt: string
    updatedAt: string | null
}