'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { LivroI } from "@/utils/types/livros" // Usado para tipar o 'livro' do sessionStorage
import { AutorI } from "@/utils/types/autores"
import { GeneroI } from "@/utils/types/generos" 
import { EditoraI } from "@/utils/types/editoras"

type Inputs = {
  // --- MUDANÇA --- 
  // Adicionei 'id' opcional para rastreamento, embora o 'livroId' no estado seja o principal
  id?: number 
  titulo: string 
  foto: string
  sinopse: string 
  autorId: number 
  generoId: number 
  editoraId: number
}

function NovoLivro() {
  const [autores, setAutores] = useState<AutorI[]>([]);
  const [generos, setGeneros] = useState<GeneroI[]>([]);
  const [editoras, setEditoras] = useState<EditoraI[]>([]);

  // --- MUDANÇA --- 
  // Adicionados estados para controlar o modo (Criação vs Edição)
  const [isEditing, setIsEditing] = useState(false);
  const [livroId, setLivroId] = useState<number | null>(null);

  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>();

  useEffect(() => {
    async function fetchData(endpoint: string, setData: Function) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/${endpoint}`);
      const dados = await response.json();
      setData(dados);
    }

    // Carrega os selects
    fetchData("autores", setAutores);
    fetchData("generos", setGeneros);
    fetchData("editoras", setEditoras);

    // --- MUDANÇA --- 
    // Lógica para verificar se estamos no modo "Editar"
    const dadosDoLivro = sessionStorage.getItem('livroParaEditar');

    if (dadosDoLivro) {
      // Se encontrou dados, estamos editando
      const livro: LivroI = JSON.parse(dadosDoLivro);
      
      // 1. Transforma os dados do LivroI para o formato do formulário (Inputs)
      // O formulário espera IDs únicos (autorId), mas o LivroI tem arrays (autores)
      // Pegamos o primeiro item dos arrays para preencher o select.
      const formData = {
        id: livro.id,
        titulo: livro.titulo,
        foto: livro.foto,
        sinopse: livro.sinopse,
        autorId: livro.autores[0]?.id || 0, // Pega o ID do primeiro autor
        generoId: livro.generos[0]?.id || 0, // Pega o ID do primeiro gênero
        editoraId: livro.editoras.id        // Pega o ID da editora
      };

      // 2. Preenche o formulário com os dados
      reset(formData);
      
      // 3. Define o estado para "Modo Edição"
      setIsEditing(true);
      setLivroId(livro.id);

      // 4. Limpa o sessionStorage para não preencher de novo
      sessionStorage.removeItem('livroParaEditar');

    } else {
      // Se não encontrou dados, é um livro novo. Foca no título.
      setIsEditing(false);
      setLivroId(null);
      setFocus("titulo");
    }

  // Adicionamos 'reset' e 'setFocus' como dependências do useEffect
  }, [reset, setFocus]); 

  // --- MUDANÇA ---
  // Renomeada de 'incluirLivro' para 'onSubmit'
  // Agora ela trata tanto o POST (incluir) quanto o PUT (atualizar)
  async function onSubmit(data: Inputs) {
    // Remove o 'id' dos dados do formulário, pois ele já está em 'livroId'
    // e o backend pode não esperar o ID no corpo do POST/PUT
    const { id, ...dadosParaEnviar } = data;

    if (isEditing && livroId) {
      // --- LÓGICA DE ATUALIZAÇÃO (PUT) ---
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros/${livroId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify(dadosParaEnviar) // Envia os dados do formulário
      });

      if (response.status === 200) { // Status 200 OK é comum para PUT
        toast.success("Ok! Livro atualizado com sucesso!!");
        reset();
        setIsEditing(false); // Volta ao modo de criação
        setLivroId(null);
      } else {
        toast.error("Erro na atualização do Livro...");
      }

    } else {
      // --- LÓGICA DE CRIAÇÃO (POST) --- (Seu código original)
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify(dadosParaEnviar) // Envia os dados do formulário
      });

      if (response.status === 201) {
        toast.success("Ok! Livro cadastrado com sucesso!!");
        reset();
        setFocus("titulo"); // Foca no título para o próximo cadastro
      } else {
        toast.error("Erro no cadastro do Livro...");
      }
    }
  }

  return (
    <>
      {/* --- MUDANÇA --- Título dinâmico */}
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        {isEditing ? `Editando Livro: ${livroId}` : "Cadastro de Livros"}
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
          <input
            type="text"
            id="sinopse"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            {...register("sinopse")}
          />
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
          {isEditing ? "Atualizar Livro" : "Incluir Livro"}
        </button>
      </form>
    </>
  );
}

export default NovoLivro;