import type { EquipmentTypeToListType } from "@/Types/EquipmentTypes";
import CustomButton from "../Shared/CustomButton"
import { ToolListMemoized } from "./ListTools";
import BoxContainer from "../Shared/BoxContainer";


export default function ToolsListAdded({ toolsList, switchOpen, name }: { toolsList: EquipmentTypeToListType[], switchOpen: () => void, name: string }) {

    return (
        <div className="p-4 rounded-lg [height:98vh] flex flex-col justify-between gap-2">
            <BoxContainer>
                <p className="text-gray-500">Prestamo para: <span className="text-black font-semibold"> {name}</span></p>
            </BoxContainer>
            <ToolListMemoized toolsList={toolsList} />
            <CustomButton
                type="button" onClick={switchOpen}
                classAdd="bg-blue-300 hover:bg-blue-400 text-blue-600 hover:text-white disabled:text-blue-600 w-full"
                disabled={toolsList.length < 1}>
                Continuar
            </CustomButton>
        </div>
    )
}

