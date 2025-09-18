import type { EquipmentTypeToListType, EquipmentType } from "@/Types/EquipmentTypes"

export const addToolTolist = (tools: EquipmentType[], toolsOfList: EquipmentTypeToListType[], value: EquipmentTypeToListType): EquipmentTypeToListType[] => {
    const toolToAdd = toolsOfList.find((tool) => tool.id === value.id);

    if (toolToAdd) {
        return IncreaseQuantity(tools, toolsOfList, toolToAdd.id!, 1)
    }
    return [...toolsOfList, value];
}

export const IncreaseQuantity = (tools: EquipmentType[], toolsOfList: EquipmentTypeToListType[], toolId: number, quantity: number): EquipmentTypeToListType[] => {
    const newList: EquipmentTypeToListType[] = toolsOfList.map(t => t.id === toolId ? validateMax(tools, t, quantity) : t);
    return newList;
}

export const DecreaseQuantity = (tools: EquipmentType[], toolsOfList: EquipmentTypeToListType[], toolId: number, quantity: number): EquipmentTypeToListType[] => {
    let newList: EquipmentTypeToListType[] = toolsOfList.map(t => t.id === toolId ? validateMin(tools, t, quantity) : t)
    newList = newList.filter(tool => tool.quantity !== 0);
    return newList;
}

export const RemoveToolOfList = (tools: EquipmentTypeToListType[], toolId: number): EquipmentTypeToListType[] => {
    const newList: EquipmentTypeToListType[] = tools.filter(t => t.id !== toolId)
    return newList;
}

const validateMin = (tools: EquipmentType[], toolOfList: EquipmentTypeToListType, quantity: number): EquipmentTypeToListType => {
    const toolValidate = tools.find(t => t.id === toolOfList.id)

    if (!toolValidate) {
        return toolOfList
    }

    if (toolOfList.quantity - quantity < 0) {
        toolOfList.quantity = 0;
    }
    else if (toolOfList.quantity > 0) {
        toolOfList.quantity = toolOfList.quantity - quantity;
    }

    return toolOfList;
}



const validateMax = (tools: EquipmentType[], toolOfList: EquipmentTypeToListType, quantity: number) => {
    const toolValidate = tools.find(t => t.id === toolOfList.id)

    if (!toolValidate) {
        return toolOfList
    }

    if (toolOfList.quantity + quantity > toolValidate.quantity) {
        toolOfList.quantity = toolValidate.quantity
    }
    else if (!(toolOfList.quantity + quantity > toolValidate.quantity)) {
        toolOfList.quantity = toolOfList.quantity + quantity;
    }

    return toolOfList;
}