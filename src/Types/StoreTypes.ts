import type { ClientType } from "./ClientTypes";
import type { EquipmentTypeToListType, EquipmentType, } from "./EquipmentTypes"

export interface ITools {
    Tools: EquipmentType[];
    ToolsToList: EquipmentTypeToListType[];
};

export interface EquipmentActions {
    fecthData: () => Promise<void>;
    setTools: (equipments: EquipmentType[]) => void;
    addTools: (tool: EquipmentTypeToListType) => void;
    increaseQuantity: (toolId: EquipmentTypeToListType, quantity: number) => void;
    decreaseQuantity: (toolId: EquipmentTypeToListType, quantity: number) => void;
    removeTool: (id: number) => void;
    clearList: () => void;
};

export interface EquipmentState {
    Equipment: ITools;
    EquipmentActions: EquipmentActions;
}

export interface IClient {
    client: ClientType | null;
    documentoToRegister: number | null;
}

export interface IClientActions {
    setCLient: (client: ClientType | null) => void;
    setDocument: (document: number) => void;
}


export interface ClientState {
    client: IClient;
    clientAction: IClientActions,
}