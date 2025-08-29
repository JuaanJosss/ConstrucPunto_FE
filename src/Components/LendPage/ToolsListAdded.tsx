import { useToolsStore } from "@/Store/Tools/ToolsStore"
import CustomButton from "../Shared/CustomButton"
import { Plus, X, Minus } from "lucide-react"
import { useShallow } from "zustand/shallow"

export default function ToolsListAdded() {
    const toolsList = useToolsStore(useShallow(state => state.ToolsToList));
    const { removeTool, increaseQuantity, decreaseQuantity } = useToolsStore()

    const removeToolToList = (id: string) => {
        removeTool(id)
    }
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg [height:98vh] flex flex-col justify-between">
            <h1 className="text-center font-semibold text-xl">{`${toolsList.length > 0 ? "Equipos agregados" : "Agrega Equipo"}`}</h1>
            {toolsList.length >= 1 && (
                <>
                    <div className="overflow-y-scroll h-[88%]">
                        {toolsList.map((item, i) => (
                            <div key={i} >
                                <div className={`flex justify-between items-center ${i % 2 !== 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                    <ul className={`gap-2 p-2 items-center`}>
                                        <li>{item.name}</li>
                                        <li> <span className="text-gray-400"> Código:</span> {item.id}</li>
                                        <li> <span className="text-gray-400"> Cantidad:</span> {item.quantity}</li>
                                        <li>
                                            <div className="flex justify-between ">
                                                <CustomButton type="button" classAdd="" paddingClass="px-2" onClick={() => decreaseQuantity(item)}> <Minus className="size-5" /> </CustomButton>
                                                <CustomButton type="button" classAdd="" paddingClass="px-2" onClick={() => increaseQuantity(item)}> <Plus className="size-5" /> </CustomButton>
                                            </div>
                                        </li>
                                    </ul>

                                    <CustomButton
                                        onClick={() => removeToolToList(item.id)}
                                        type="button"
                                        classAdd="text-red-500 hover:bg-red-500 hover:text-white">
                                        <X />
                                    </CustomButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </>)}

            <CustomButton
                type="button"
                classAdd="bg-blue-300 hover:bg-blue-400 text-blue-600 hover:text-white disabled:text-blue-600 w-full"
                disabled={toolsList.length < 1}>
                Continuar
            </CustomButton>
        </div>
    )
}
