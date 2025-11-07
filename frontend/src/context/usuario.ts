import { UsuarioI } from '@/utils/types/usuarios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

type UsuarioStore = {
    usuario: UsuarioI;
    logaUsuario: (usuarioLogado: UsuarioI) => void;
    atualizaUsuario: (usuarioAtualizado: UsuarioI) => void;
    deslogaUsuario: () => void;
};

export const useUsuarioStore = create<UsuarioStore>()(
    persist((set, get) => ({
        usuario: {} as UsuarioI,
        logaUsuario: (usuarioLogado) => set({ usuario: usuarioLogado }),
        atualizaUsuario: (usuarioAtualizado: UsuarioI) => set({ usuario: usuarioAtualizado }),
        deslogaUsuario: () => set({ usuario: {} as UsuarioI }) // Nome unificado
    }),
    {
        name: 'ima-storage',
    }
));
