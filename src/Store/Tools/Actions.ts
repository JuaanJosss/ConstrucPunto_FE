import type { ToolsToListType, ToolsType } from "@/Types/ToolsTypes"

export const addToolTolist = (tools: ToolsType[], toolsOfList: ToolsToListType[], value: ToolsToListType): ToolsToListType[] => {
    const toolToAdd = toolsOfList.find((tool) => tool.id === value.id);

    if (toolToAdd) {
        return IncreaseQuantity(tools, toolsOfList, toolToAdd.id)
    }
    return [...toolsOfList, value];
}

export const IncreaseQuantity = (tools: ToolsType[], toolsOfList: ToolsToListType[], toolId: string): ToolsToListType[] => {
    const newList: ToolsToListType[] = toolsOfList.map(t => t.id === toolId ? validateMinMax(tools, t, 1) : t);
    return newList;
}

export const DecreaseQuantity = (tools: ToolsType[], toolsOfList: ToolsToListType[], toolId: string): ToolsToListType[] => {
    let newList: ToolsToListType[] = toolsOfList.map(t => t.id === toolId ? validateMinMax(tools, t, 0) : t)
    newList = newList.filter(tool => tool.quantity !== 0);
    return newList;
}

export const RemoveToolOfList = (tools: ToolsToListType[], toolId: String): ToolsToListType[] => {
    const newList: ToolsToListType[] = tools.filter(t => t.id !== toolId)
    return newList;
}

const validateMinMax = (tools: ToolsType[], toolOfList: ToolsToListType, operation: number): ToolsToListType => {
    const toolValidate = tools.find(t => t.id === toolOfList.id)

    if (operation === 0) {
        if (toolOfList.quantity > 0) {
            toolOfList.quantity = toolOfList.quantity - 1;
        }
    }
    else {
        if (!(toolOfList.quantity + 1 > toolValidate!.disponibility)) {
            toolOfList.quantity = toolOfList.quantity + 1;
        }
    }

    return toolOfList;
}