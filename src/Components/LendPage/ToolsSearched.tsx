import { useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { useToolsStore } from "@/Store/Tools/ToolsStore";
import type { ToolsType } from "@/Types/ToolsTypes";
import { ToolsColumn } from "./ToolList";
import CustomButton from "@/Components/Shared/CustomButton";

export default function ToolsSearched({ tool, idx }: { tool: ToolsType, idx: number }) {
    const addTools = useToolsStore(useShallow(state => state.addTools));
    const toolsOnList = useToolsStore(state => state.ToolsToList)

    function addTolist(id: string, name: string) {
        addTools({ id, name, quantity: 1 });
    }

    const toolsMap = useMemo(() => {
        return new Map(toolsOnList.map(t => [t.id, t]));
    }, [toolsOnList]);

    const tValidate = toolsMap.get(tool.id);
    const isDisabled = tValidate ? tValidate.quantity >= tool.disponibility : false

    return (
        <ToolsColumn.Column color={`${idx % 2 !== 0 ? 'bg-gray-100' : 'bg-white'}`}>
            <ToolsColumn.Container>
                <ToolsColumn.Name name={tool.name} />
                <ToolsColumn.Information dispo={tool.disponibility} code={tool.id} />
            </ToolsColumn.Container>
            <CustomButton onClick={() => addTolist(tool.id, tool.name)}
                id={tool.id}
                type="button"
                classAdd="bg-green-700 hover:bg-green-800 text-white"
                disabled={isDisabled}
            >Agregar
            </CustomButton>
        </ToolsColumn.Column>

    )
}