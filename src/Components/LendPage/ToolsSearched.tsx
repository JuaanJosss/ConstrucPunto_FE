import { useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { useEquipmentsStore } from "@/Store/Equipment/EquipmentStore";
import type { EquipmentType } from "@/Types/EquipmentTypes";
import { ToolsColumn } from "../Shared/ToolColumn";
import CustomButton from "@/Components/Shared/CustomButton";
import { formatCurrency } from "@/helpers/formatters";

export default function ToolsSearched({ tool, idx }: { tool: EquipmentType, idx: number }) {
    const addTools = useEquipmentsStore(useShallow(state => state.addTools));
    const toolsOnList = useEquipmentsStore(state => state.ToolsToList)

    function addTolist(tool: EquipmentType) {
        addTools({ ...tool, quantity: 1 });
    }

    const toolsMap = useMemo(() => {
        return new Map(toolsOnList.map(t => [t.id, t]));
    }, [toolsOnList]);

    const tValidate = toolsMap.get(tool.id);
    const isDisabled = tValidate ? tValidate.quantity >= tool.quantity : false

    return (
        <ToolsColumn.Column color={`${idx % 2 !== 0 ? 'bg-gray-100' : 'bg-white'}`}>
            <ToolsColumn.Container>
                <ToolsColumn.Name name={tool.name} />
                <ToolsColumn.Code code={tool.id!} />
                <ToolsColumn.Disponibility dispo={tool.quantity} />
                <ToolsColumn.UnitPrice price={formatCurrency(tool.unitPrice)} />
            </ToolsColumn.Container>
            <CustomButton onClick={() => addTolist(tool)}
                type="button"
                classAdd="bg-green-700 hover:bg-green-800 text-white"
                disabled={isDisabled || tool.quantity === 0}
            >Agregar
            </CustomButton>
        </ToolsColumn.Column>

    )
}