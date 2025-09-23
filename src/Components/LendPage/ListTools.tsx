import type { EquipmentTypeToListType } from "@/Types/EquipmentTypes"
import CustomButton from "../Shared/CustomButton"
import { useEquipmentsStore } from "@/Store/Equipment/EquipmentStore";
import { X } from "lucide-react";
import React from "react";
import { formatCurrency } from "@/helpers/formatters";
import BoxContainer from "../Shared/BoxContainer";

const ToolListRight = ({ toolsList }: { toolsList: EquipmentTypeToListType[] }) => {
    const { removeTool, increaseQuantity, decreaseQuantity } = useEquipmentsStore();

    const removeToolToList = (id: number) => {
        removeTool(id)
    }

    return (
        <BoxContainer classes="overflow-hidden h-12/12">
            <h1 className="text-center font-semibold text-xl">{`${toolsList.length > 0 ? "Equipos agregados" : "Agrega Equipo"}`}</h1>
            <div className="overflow-y-scroll h-11/12">
                {toolsList.map((item, i) => (
                    <div key={i} >
                        <div className={`flex justify-between items-center ${i % 2 !== 0 ? 'bg-gray-100' : 'bg-white'}`}>
                            <ul className={`gap-2 p-2 items-center`}>
                                <li>{item.name}</li>
                                <li> <span className="text-gray-400"> Código:</span> {item.id}</li>
                                <li> <span className="text-gray-400"> Cantidad:</span> {item.quantity}</li>
                                <li> <span className="text-gray-400"> Valor día:</span> {formatCurrency(item.quantity * item.unitPrice)}</li>
                                <li>
                                    <div className="flex gap-5 text-white">
                                        <div className="flex gap-2">
                                            <CustomButton type="button" classAdd="border bg-blue-400 hover:bg-blue-500" paddingClass="px-2" onClick={() => increaseQuantity(item, 10)}> +10 </CustomButton>
                                            <CustomButton type="button" classAdd="border bg-blue-400 hover:bg-blue-500" paddingClass="px-2" onClick={() => increaseQuantity(item, 1)}> +1 </CustomButton>
                                        </div>
                                        <div className="flex gap-2">
                                            <CustomButton type="button" classAdd="border bg-red-600 hover:bg-red-700" paddingClass="px-2" onClick={() => decreaseQuantity(item, 1)}> -1 </CustomButton>
                                            <CustomButton type="button" classAdd="border bg-red-600 hover:bg-red-700" paddingClass="px-2" onClick={() => decreaseQuantity(item, 10)}> -10 </CustomButton>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                            <CustomButton
                                onClick={() => removeToolToList(item.id!)}
                                type="button"
                                classAdd="text-red-500 hover:bg-red-500 hover:text-white">
                                <X />
                            </CustomButton>
                        </div>
                    </div>
                ))}
            </div>
        </BoxContainer>
    )
}


export const ToolListMemoized = React.memo(ToolListRight);
