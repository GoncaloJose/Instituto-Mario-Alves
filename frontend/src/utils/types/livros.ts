export interface LivroI {

    id:               number
    titulo:           string   
    foto:             string
    sinopse:          string
    genero:           string
    editora:          string
    autor:            string
    autores:         Array<{ id: number; nome: string }>
    editoras:        { id: number; nome: string }
    generos:         Array<{ id: number; tipo: string }>
    destaque:         boolean
    createdAt:        Date
    updatedAt:        Date
}