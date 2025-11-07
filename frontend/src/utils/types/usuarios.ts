import { ReactNode } from "react"

export interface UsuarioI {
    livro: ReactNode
    
    id: number
    nome: string
    email: string
    inadimplente: boolean
}