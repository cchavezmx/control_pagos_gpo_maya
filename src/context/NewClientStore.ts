import { create } from 'zustand'
import { IStore } from '../types'

type Store = {
  name: string;
  projectId: string;
  lote: string;
  manzana: string;
  setClientName: (clientName: string) => void;
  setClientAttempt: (payload: IStore) => void;
}



export const NewClientStore = create<Store>()((set) => ({
    name: "",
    projectId: "",
    lote: "",
    manzana: "",
    setClientName: (name: string) => set({ name }),  
    setClientAttempt: (payload: IStore) => set({ ...payload }),    
}))


 