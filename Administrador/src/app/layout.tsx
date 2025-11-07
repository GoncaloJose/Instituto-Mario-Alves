'use client';

import './globals.css';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        {/* Metadados adicionais podem ser inseridos aqui */}
        <title>Administrador: Subversivo</title>
      </head>
      <body>
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}