export interface ReservaI {
    id: number
    livroId: number
    usuarioId: number
    datadaReserva: Date
    datadaEntrega: Date
    status: string
}