import { getEquipmentByName } from "@/Services/EquipmentService";
import { Modal } from "@/Components/Shared/Modal"
import { NavLink } from "react-router";
import { onlyLettersPatternValidator } from "@/validations/validation";
import { Plus } from "lucide-react";
import { routes } from "@/Router/routes"
import BoxContainer from "@/Components/Shared/BoxContainer"
import CustomButton from "@/Components/Shared/CustomButton"
import ListEquipment from "@/Components/EquipmentManagement/ListEquipment"
import SearcBar from "@/Components/LendPage/SearcBar"
import type { IFindEquipmentByName } from "@/Types/FormType";
import useEquipmentManagementHook from "@/hooks/EquipmentManagementHook"

export default function EquipmentManagement() {
    const { equipments, setEquipments, openModal, register, handleSubmit,
        onCancel, onConfirm, removeTool, toggleButton, isFilteredActive, setIsFilteredActive, errors } = useEquipmentManagementHook()

    const handlerSubmit = async (data: IFindEquipmentByName) => {
        if (!data.equipment) return;

        setIsFilteredActive(true);
        await getEquipmentByName(data.equipment).then(setEquipments);
    }

    return (
        <>
            <BoxContainer height="h-20">
                <SearcBar
                    handlerSubmit={handlerSubmit}
                    handleSubmit={handleSubmit}
                    {...register('equipment', { pattern: onlyLettersPatternValidator })}
                    error={errors.equipment} />
            </BoxContainer>

            <BoxContainer height="h-[calc(100vh-120px)]" >
                <div className="grid grid-cols-2 gap-4 my-2 items-center">
                    {isFilteredActive && <CustomButton onClick={toggleButton} type="button" classAdd="justify-self-start bg-gray-200 hover:bg-gray-300"> Borrar búsqueda  </CustomButton>}
                    <NavLink
                        to={`/${routes.FORMS}/${routes.EQUIPMENT.ADD}`}
                        className="bg-green-600 hover:bg-green-700 text-white col-start-2 w-max flex p-2 rounded-md justify-self-end transition-colors duration-200">
                        <Plus /> Agregar
                    </NavLink>
                </div>

                <div className="h-[calc(100%-60px)] overflow-y-scroll">
                    {equipments.length > 0 && equipments && equipments.map((e, idx) => <ListEquipment key={idx} idx={idx} e={e} OnDelete={removeTool} />)}
                </div>
            </BoxContainer>


            <Modal isOpen={openModal} onClose={onCancel} isQuestion={true} onCancel={onCancel} onConfirm={onConfirm} title="Eliminar" >
                <span className="text-center font-semibold text-lg">¿Está seguro de eliminar esta herramienta?</span>
            </Modal>
        </>
    )
}