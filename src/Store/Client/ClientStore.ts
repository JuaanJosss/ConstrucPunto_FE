import { create } from "zustand";
import { ClientSlice } from "./ClientSlice";
import type { IClient, IClientActions } from "@/Types/StoreTypes";

export const useClientStore = create<IClient & IClientActions>((...a) => ({
    ...ClientSlice(...a)
}))