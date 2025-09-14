import type { EquipmentType } from "@/Types/EquipmentTypes";
import { ToolsColumn } from "../Shared/ToolColumn";
import { useNavigate } from "react-router";
import { routes } from "@/Router/routes";
import CustomButton from "../Shared/CustomButton";
import { Pencil, Trash } from "lucide-react";

export default function ListEquipment({ e, OnDelete }: { e: EquipmentType, OnDelete: (id: number) => void }) {
  const navigate = useNavigate()

  const onEdit = (id: number) => {
    navigate(`/${routes.FORMS}/${routes.EQUIPMENT.EDIT}/${id}`);
  };

  return (
    <ToolsColumn.Column color="bg-gray-100">
      <ToolsColumn.Container>
        <ToolsColumn.Name name={e.name} />
        <ToolsColumn.Code code={e.id!} />
        <ToolsColumn.Disponibility dispo={e.quantity} />
        <ToolsColumn.TotalStock total={e.total} />
        <ToolsColumn.Description description={e.description!} />
      </ToolsColumn.Container>
      <div className="flex gap-2 text-white">
        <CustomButton type="button" classAdd="bg-blue-500 hover:bg-blue-700" onClick={() => onEdit(e.id!)}> <Pencil /> </CustomButton>
        <CustomButton type="button" classAdd="bg-red-500 hover:bg-red-700" onClick={() => OnDelete(e.id!)}> <Trash />  </CustomButton>
      </div>
    </ToolsColumn.Column>
  )
}
