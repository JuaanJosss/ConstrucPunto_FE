import type { EquipmentActions, ITools } from "@/Types/StoreTypes";
import type { StateCreator } from "zustand";
import { addToolTolist, DecreaseQuantity, IncreaseQuantity, RemoveToolOfList } from "./Actions";

import { getEquipment } from "@/Services/EquipmentService";




export const createEquipmentSlice: StateCreator<ITools & EquipmentActions> = (set) => ({
    Tools: [],
    ToolsToList: [],
    fecthData: async () => {
        try {
            const data = await getEquipment();

            set({ Tools: data });
        } catch (err) {
            console.error("Error fetching tools:", err);
        }
    },
    setTools: (value) => set(() => ({
        Tools: value
    })),
    clearList: () => set(() => ({
        ToolsToList: []
    })),
    addTools: (value) => set((state) => ({
        ToolsToList: addToolTolist(state.Tools, state.ToolsToList, value)
    })),
    removeTool: (id) =>
        set((state) => ({
            ToolsToList: RemoveToolOfList(state.ToolsToList, id),
        })),
    increaseQuantity: (toolId, quantity) => set((state) => {
        return {
            ToolsToList: IncreaseQuantity(state.Tools, state.ToolsToList, toolId.id!, quantity),
        };
    }),
    decreaseQuantity: (toolId, quantity) => set((state) => {
        return {
            ToolsToList: DecreaseQuantity(state.Tools, state.ToolsToList, toolId.id!, quantity),
        };
    }),
})
