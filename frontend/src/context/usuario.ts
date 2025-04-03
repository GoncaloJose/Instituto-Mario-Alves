import { UsuarioI } from '@/utils/types/usuarios';
import { create } from 'zustand';

type UsuarioStore = {
    usuario: UsuarioI;
    logaUsuario: (usuarioLogado: UsuarioI) => void;
    deslogaUsuario: () => void; // Corrigido o nome para "deslogaUsuario"
};

export const useUsuarioStore = create<UsuarioStore>((set) => ({
    usuario: {} as UsuarioI,
    logaUsuario: (usuarioLogado) => set({ usuario: usuarioLogado }),
    deslogaUsuario: () => set({ usuario: {} as UsuarioI }) // Nome unificado
}));