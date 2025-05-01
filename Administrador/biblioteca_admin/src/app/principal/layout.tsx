'use client';

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Titulo } from "../../components/Titulo";
import { MenuLateral } from "../../components/MenuLateral";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [logado, setLogado] = useState<boolean>(false);

  useEffect(() => {
    const adminLogadoId = Cookies.get("admin_logado_id");
    if (adminLogadoId) {
      setLogado(true);
    } else {
      router.replace("/"); // Redireciona para a página inicial em caso de logout
    }
  }, [router]); // Incluímos "router" como dependência para garantir que ele seja sempre atualizado

  return (
    <html lang="pt-br">
      <body>
        {logado ? (
          <div>
            <Titulo />
            <MenuLateral />
            <div className="p-4 sm:ml-64">{children}</div>
          </div>
        ) : (
          <div>
            <p>Haja paciência pra esperar essa merda... 💩💩💩</p>
          </div>
        )}
      </body>
    </html>
  );
}