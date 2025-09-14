import type { IClient, IClientActions } from "@/Types/StoreTypes";
import type { StateCreator } from "zustand";
import { SetClient } from "./Actions";

export const ClientSlice: StateCreator<IClient & IClientActions> = (set) => ({
    client: null,
    documentoToRegister: null,
    setCLient: (value) => set((state => ({
        client: SetClient(value, state.client!)
    }))),
    setDocument: (value) => set(() => ({
        documentoToRegister: value
    }))
})