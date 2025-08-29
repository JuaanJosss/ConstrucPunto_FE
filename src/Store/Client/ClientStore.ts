import { create } from "zustand";
import { ClientSlice } from "./ClientSlice";
import type { ClientState } from "@/Types/StoreTypes";

export const ClientStore = create<ClientState>((...a) => ({
    ...ClientSlice(...a)
}))