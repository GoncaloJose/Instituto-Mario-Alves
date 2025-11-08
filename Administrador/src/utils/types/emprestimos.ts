export interface EmprestimoI {
    id: number
    usuarioId: string
    livroId: string
    datadaReserva: Date
    datadaEntrega: Date
    status: string
    usuario: {
        nome: string;
    }
    livro: {
        titulo: string;
        autores: Array<{ id: number, nome: string }>
    }
}