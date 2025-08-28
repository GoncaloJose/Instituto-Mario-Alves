'use client'
import Cookies from "js-cookie"
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoPersonSharp } from "react-icons/io5";

export function Titulo() {
  const [adminNome, setAdminNome] = useState<string>("")

  useEffect(() => {
    if (Cookies.get("admin_logado_nome")) {
      setAdminNome(Cookies.get("admin_logado_nome") as string)
    }
  }, [])

  return (
    <nav className="bg-vermelho border-gray-200 dark:bg-gray-900 flex flex-wrap justify-between fixed top-0 left-0 w-full z-50">
      <div className="flex flex-wrap justify-between max-w-screen-xl p-4">
        <Link href="/principal" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/vermelho.png" className="h-16" alt="IMA" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">
            Administrador
          </span>
        </Link>
      </div>
      <div className="flex me-4 items-center font-bold text-white">
        <IoPersonSharp className="mr-2" />
        {adminNome}
      </div>
    </nav>
  )
}