import ToolsListAdded from "@/Components/LendPage/ToolsListAdded";
import ToolsSearched from "@/Components/LendPage/ToolsSearched";

import { Modal } from "@/Components/Shared/Modal";
import { ModalContent } from "@/Components/LendPage/Modal/ModalContent";

import SearcBar from "@/Components/LendPage/SearcBar";
import useLendingPageHook from "@/hooks/LendingPageHook";
import BoxContainer from "@/Components/Shared/BoxContainer";
import type { IFindEquipmentByName } from "@/Types/FormType";
import { getEquipmentByName } from "@/Services/EquipmentService";
import { onlyLettersPatternValidator, requiredValidator } from "@/validations/validation";
import CustomButton from "@/Components/Shared/CustomButton";


export default function Lendingpage() {
    const { client, toolsList, isOpen, equipments, switchOpen, handlerSubmit, setEquipment, toggleButton, handleSubmit, isFilteredActive, register, setIsFilteredActive, errors } = useLendingPageHook();


    const handlerFilter = async (data: IFindEquipmentByName) => {
        setIsFilteredActive(true)
        await getEquipmentByName(data.equipment).then(setEquipment);
    }


    return (
        <div className="flex gap-3 w-12/12 mx-auto overflow-hidden">
            <div className="md:w-8/12 @3xl:w-12/12">
                <BoxContainer classes="space-y-2">
                    <SearcBar
                        handlerSubmit={handlerFilter}
                        handleSubmit={handleSubmit}
                        {...register('equipment', { pattern: onlyLettersPatternValidator, required: requiredValidator })}
                        error={errors.equipment}
                    />
                    {isFilteredActive && <CustomButton
                        onClick={toggleButton} type="button"
                        classAdd="justify-self-start bg-gray-200 hover:bg-gray-300">Borrar filtro</CustomButton>}
                </BoxContainer>
                <BoxContainer height="md:h-[75vh] @3xl:h-[80vh] overflow-y-scroll">
                    {equipments.map((tool, i) => <ToolsSearched key={i} tool={tool} idx={i} />)}
                </BoxContainer>
            </div>
            <ToolsListAdded name={client?.name!} switchOpen={switchOpen} toolsList={toolsList} />


            <Modal title="Pagaré" isOpen={isOpen} onClose={switchOpen} >
                <ModalContent client={client!} toolsList={toolsList} handlerSubmit={handlerSubmit} />
            </Modal>
        </div>
    )
}


