// import type { ToolsActions, ITools } from "@/Types/StoreTypes";
// import type { StateCreator } from "zustand";
// import { addToolTolist, DecreaseQuantity, IncreaseQuantity, RemoveToolOfList } from "./Actions";

// export const createToolsSlice: StateCreator<ITools & ToolsActions> = (set) => ({
//     Tools: [],
//     ToolsToList: [],
//     addTools: (value) => set((state) => ({
//         ToolsToList: addToolTolist(state.Tools, state.ToolsToList, value)
//     })),
//     removeTool: (id) =>
//         set((state) => ({
//             ToolsToList: RemoveToolOfList(state.ToolsToList, id),
//         })),
//     increaseQuantity: (toolId) => set((state) => {
//         return {
//             ToolsToList: IncreaseQuantity(state.Tools, state.ToolsToList, toolId.id),
//         };
//     }),
//     decreaseQuantity: (toolId) => set((state) => {
//         return {
//             ToolsToList: DecreaseQuantity(state.Tools, state.ToolsToList, toolId.id),
//         };
//     }),
// })
