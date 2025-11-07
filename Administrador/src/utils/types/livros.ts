
export interface LivroI {

    destaque:         boolean

    id:               number
    titulo:           string   
    foto:             string
    sinopse:          string
    generoId:         string
    editora:          string
    autorId:          string
    createdAt:        Date
    updatedAt:        Date
    autores:          Array<{ id: number, nome: string }>
    generos:          Array<{ id: number, tipo: string }>
    editoras:         { id: number, nome: string }
}