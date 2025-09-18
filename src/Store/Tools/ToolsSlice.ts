import type { ToolsActions, ITools } from "@/Types/StoreTypes";
import type { StateCreator } from "zustand";
import { addToolTolist, DecreaseQuantity, IncreaseQuantity, RemoveToolOfList } from "./Actions";
import type { ToolsType } from "@/Types/ToolsTypes";

const data: ToolsType[] = [
    { name: "Escalera", disponibility: 2, id: "dwada12" },
    { name: "Martillo", disponibility: 5, id: "abc123" },
    { name: "Taladro", disponibility: 6, id: "xyz789" },
    { name: "Destornillador", disponibility: 10, id: "screw001" },
    { name: "Llave inglesa", disponibility: 3, id: "wrench77" },
    { name: "Sierra eléctrica", disponibility: 4, id: "saw202" },
    { name: "Cinta métrica", disponibility: 8, id: "measure09" },
    { name: "Nivel", disponibility: 4, id: "level333" },
    { name: "Alicates", disponibility: 6, id: "pliers56" },
    { name: "Soldador", disponibility: 8, id: "weld909" }
];

export const createToolsSlice: StateCreator<ITools & ToolsActions> = (set) => ({
    Tools: [...data],
    ToolsToList: [],
    addTools: (value) => set((state) => ({
        ToolsToList: addToolTolist(state.Tools, state.ToolsToList, value)
    })),
    removeTool: (id) =>
        set((state) => ({
            ToolsToList: RemoveToolOfList(state.ToolsToList, id),
        })),
    increaseQuantity: (toolId) => set((state) => {
        return {
            ToolsToList: IncreaseQuantity(state.Tools, state.ToolsToList, toolId.id),
        };
    }),
    decreaseQuantity: (toolId) => set((state) => {
        return {
            ToolsToList: DecreaseQuantity(state.Tools, state.ToolsToList, toolId.id),
        };
    }),
})
