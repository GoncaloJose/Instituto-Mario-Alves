export interface PagamentoI {
    id:               number
    usuarioId:        number
    usuario:          { id: number, nome: string }
    valor:            number
    dataPagamento:    Date
    formaPagamento:   string

    createdAt:        Date
    updatedAt:        Date
}