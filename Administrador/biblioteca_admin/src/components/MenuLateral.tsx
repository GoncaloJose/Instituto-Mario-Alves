"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { IoExitOutline } from "react-icons/io5"
import { BiSolidDashboard } from "react-icons/bi"
import { FaCarSide, FaUsers } from "react-icons/fa6"
import { BsCashCoin } from "react-icons/bs"
import Link from "next/link"
import { MdAdminPanelSettings } from "react-icons/md"
import { FaBookReader } from "react-icons/fa"
import { FaBook } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { FaAddressBook } from "react-icons/fa";

export function MenuLateral() {
  const router = useRouter()

  function adminSair() {
    if (confirm("Confirma Saída?")) {
      Cookies.remove("admin_logado_id")
      Cookies.remove("admin_logado_nome")
      Cookies.remove("admin_logado_token")
      router.replace("/")
    }
  }

  return (
    <aside id="default-sidebar" className="fixed mt-24 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-red-500 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
        <li>
            <Link href="/principal" className="flex items-center p-2">
              <span className="h-5 text-gray-600 text-2xl">
              <MdAdminPanelSettings />
              </span>
              <span className="ms-2 mt-1">Visão Geral</span>
            </Link>
          </li>
          <li>
            <Link href="/principal/livros" className="flex items-center p-2">
              <span className="h-5 text-gray-600 text-2xl">
              <FaBookReader />
              </span>
              <span className="ms-2 mt-1">Livros</span>
            </Link>
          </li>
          <li>
          <Link href="/principal/usuarios" className="flex items-center p-2">
              <span className="h-5 text-gray-600 text-2xl">
                <FaUsers />
              </span>
              <span className="ms-2 mt-1">Controle de Usuários</span>
            </Link>
          </li>
          <li>
          <Link href="/principal/cadastros" className="flex items-center p-2">
              <span className="h-5 text-gray-600 text-2xl">
              <FaBook />
              </span>
              <span className="ms-2 mt-1">Cadastrar de Usuários</span>
            </Link>
          </li>
          <li>
          <Link href="/principal/locacao" className="flex items-center p-2">
              <span className="h-5 text-gray-600 text-2xl">
              <FaAddressBook />
              </span>
              <span className="ms-2 mt-1">Gerenciar das Locações</span>
            </Link>
          </li>
          <li>
          <Link href="/principal/comentarios" className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-gray-600 text-2xl">
              <FaRegCommentDots />
              </span>
              <span className="ms-2 mt-1">Controle de Comentários</span>
            </Link>
          </li>

          <li>
            <span className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-gray-600 text-2xl">
              <ImExit />
              </span>
              <span className="ms-2 mt-1" onClick={adminSair}>Sair do Sistema</span>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  )
}