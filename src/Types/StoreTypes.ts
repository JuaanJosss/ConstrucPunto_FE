import type { ClientType } from "./ClientTypes";
import type { ToolsToListType, ToolsType, } from "./ToolsTypes";

export interface ITools {
    Tools: ToolsType[];
    ToolsToList: ToolsToListType[];
};

export interface ToolsActions {
    setTools?: () => void;
    addTools: (tool: ToolsToListType) => void;
    increaseQuantity: (toolId: ToolsToListType) => void;
    decreaseQuantity: (toolId: ToolsToListType) => void;
    removeTool: (id: string) => void;
};

export interface ToolState {
    tools: ITools;
    toolActions: ToolsActions;
}

export interface IClient {
    client: ClientType;
}

export interface IClientActions {
    setCLient: (client: ClientType) => void;
}


export interface ClientState {
    client: IClient;
    clientAction: IClientActions,
}