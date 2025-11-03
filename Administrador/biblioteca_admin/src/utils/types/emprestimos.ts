export interface EmprestimoI {
    id: number
    usuarioId: number
    livroId: number
    datadaReserva: Date
    datadaEntrega: Date | null
    status: string
    
}