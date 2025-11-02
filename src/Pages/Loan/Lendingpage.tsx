import ToolsSearched from "@/Components/LendPage/ToolsSearched";
import { Modal } from "@/Components/Shared/Modal";
import { ModalContent } from "@/Components/LendPage/Modal/ModalContent";
import SearcBar from "@/Components/LendPage/SearcBar";
import useLendingPageHook from "@/hooks/LendingPageHook";
import BoxContainer from "@/Components/Shared/BoxContainer";
import type { IFindEquipmentByName } from "@/Types/FormType";
import { getEquipmentByName } from "@/Services/EquipmentService";
import { onlyLettersPatternValidator } from "@/validations/validation";
import CustomButton from "@/Components/Shared/CustomButton";
import Paragraph from "@/Components/Shared/Paragraph";
import { ToolListMemoized } from "@/Components/LendPage/ListTools";


export default function Lendingpage() {
    const { client, toolsList, isOpen, equipments, switchModal, handlerSubmit, setEquipment, toggleButton, handlerCancelLoan, handleSubmit, isFilteredActive, register, setIsFilteredActive, errors } = useLendingPageHook();


    const handlerFilter = async (data: IFindEquipmentByName) => {
        if (!data.equipment) {
            return;
        }

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
                        {...register('equipment', { pattern: onlyLettersPatternValidator })}
                        label="Busca equipo"
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

            <div className="p-4 rounded-lg h-[98vh] flex flex-col justify-around">
                <BoxContainer classes="flex items-center gap-2">
                    <Paragraph section="Prestamo para" text={client?.name!} />
                    <CustomButton type="button" classAdd="bg-red-500 hover:bg-red-700 text-white" onClick={handlerCancelLoan} >Cancelar pedido</CustomButton>
                </BoxContainer>

                <ToolListMemoized toolsList={toolsList} />

                <CustomButton
                    type="button" onClick={switchModal}
                    classAdd="bg-blue-300 hover:bg-blue-400 text-blue-600 hover:text-white disabled:text-blue-600 w-full"
                    disabled={toolsList.length < 1}>
                    Continuar
                </CustomButton>
            </div>


            <Modal title="Pagaré" isOpen={isOpen} onClose={switchModal} height="h-[650px] overflow-y-scroll" width="w-[50%]" >
                <ModalContent client={client!} toolsList={toolsList} handlerSubmit={handlerSubmit} />
            </Modal>
        </div>
    )
}


