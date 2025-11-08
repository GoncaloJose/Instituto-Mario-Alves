'use client';
import { LivroI } from "@/utils/types/livros";
import { AutorI } from "@/utils/types/autores"
import { GeneroI } from "@/utils/types/generos" 
import { EditoraI } from "@/utils/types/editoras"

import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { useForm } from "react-hook-form";

type LivroDados = {
    titulo: string
    foto: string
    sinopse: string 
    autorId: number 
    generoId: number 
    editoraId: number
}

const EditarLivro = async ({ params }: { params: Promise<{ id: number }>}) => { 
    // 1 atraves do id do livro recebido pelas propriedades do componente
    // 2 criar um estado para armazenar os dados do livro/usseState
    // 3 usar o useEffect para carregar os dados do livro quando o componente for montado/ useEffect
    // 4 criar um formulário para editar os dados do livro
    // 5 criar uma função para enviar os dados editados para a API
    // 6 tratar a resposta da API e exibir uma mensagem de sucesso ou erro
    const [autores, setAutores] = useState<AutorI[]>([]);
    const [generos, setGeneros] = useState<GeneroI[]>([]);
    const [editoras, setEditoras] = useState<EditoraI[]>([]);
    const { id } = await params;
    const [livro, setLivro] = useState<LivroI>();

    const { register, handleSubmit, reset, setFocus } = useForm<LivroDados>();
    
      useEffect(() => {
        async function fetchData(endpoint: string, setData: Function) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_API}/${endpoint}`
          );
          const dados = await response.json();
          setData(dados);
        }

        // Carrega os selects
        // fetchData("autores", setAutores);
        // fetchData("generos", setGeneros);
        // fetchData("editoras", setEditoras);
      });

    useEffect(() => {
        const buscarLivro = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros/${id}`);
            if (response.ok) {
                const dados = await response.json();

                setLivro(dados);
            } else {
                toast.error("Erro ao buscar o livro na API");
            }
        }

        //buscarLivro();
    }, [id]);

    const onSubmit = () => {}

  return (
    <>
      {/* --- MUDANÇA --- Título dinâmico */}
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        {`Editando Livro: ${livro?.titulo}`}
      </h1>

      {/* --- MUDANÇA --- onSubmit agora chama a nova função */}
      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
        
        {/* --- CAMPO TÍTULO --- (sem mudança) */}
        <div className="mb-3">
          <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            {...register("titulo")}
          />
        </div>

        {/* --- CAMPO AUTOR --- */}
        <div className="mb-3">
          <label htmlFor="autorId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Autor(a)
          </label>
          {/* --- MUDANÇA --- Adicionado { valueAsNumber: true } para garantir que o 'data' tenha um número */}
          <select id="autorId" className="block border border-gray-500 rounded-md p-2" {...register("autorId", { valueAsNumber: true })}>
            <option value="">Selecione um autor(a)</option>
            {autores.map(autor => (
              <option key={autor.id} value={autor.id}>{autor.nome}</option>
            ))}
          </select>
        </div>

        {/* --- CAMPO GÊNERO --- */}
        <div className="mb-3">
          <label htmlFor="generoId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Gênero
          </label>
          {/* --- MUDANÇA --- Adicionado { valueAsNumber: true } */}
          <select id="generoId" className="block border border-gray-500 rounded-md p-2" {...register("generoId", { valueAsNumber: true })}>
            <option value="">Selecionar gênero</option>
            {generos.map(genero => (
              <option key={genero.id} value={genero.id}>{genero.tipo}</option>
            ))}
          </select>
        </div>

        {/* --- CAMPO EDITORA --- */}
        <div className="mb-3">
          <label htmlFor="editora" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Editora
          </label>
          {/* --- MUDANÇA --- Adicionado { valueAsNumber: true } */}
          <select id="editora" className="block border border-gray-500 rounded-md p-2" {...register("editoraId", { valueAsNumber: true })}>
            <option value="">Selecionar editora</option>
            {editoras.map(editora => (
              <option key={editora.id} value={editora.id}>{editora.nome}</option>
            ))}
          </select>
        </div>

        {/* --- CAMPO SINOPSE --- (sem mudança) */}
        <div className="mb-3">
          <label htmlFor="sinopse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sinopse
          </label>
          <textarea
            id="sinopse"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            {...register("sinopse")}
          >
		  </textarea>
        </div>

        {/* --- CAMPO FOTO --- (sem mudança) */}
        <div className="mb-3">
          <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            URL da Foto
          </label>
          <input
            type="text"
            id="foto"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            {...register("foto")}
          />
        </div>

        {/* --- MUDANÇA --- Texto do botão dinâmico */}
        <button
          type="submit"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Atualizar Livro
        </button>
      </form>
    </>
  );
}

export default EditarLivro;