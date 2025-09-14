import ListEquipment from "@/Components/EquipmentManagement/ListEquipment"
import SearcBar from "@/Components/LendPage/SearcBar"
import BoxContainer from "@/Components/Shared/BoxContainer"
import { Modal } from "@/Components/Shared/Modal"
import useEquipmentManagementHook from "@/hooks/EquipmentManagementHook"
import { routes } from "@/Router/routes"
import { Plus } from "lucide-react"
import { NavLink } from "react-router"

export default function EquipmentManagement() {
    const { equipments, openModal, register, handleSubmit, onCancel, onConfirm, removeTool } = useEquipmentManagementHook()


    const handlerSubmit = async (data: number) => {
        // await getCLientById(data).then(setClient);
    }

    return (
        <>
            <BoxContainer height="h-20" >
                <SearcBar handlerSubmit={handlerSubmit} handleSubmit={handleSubmit} {...register('name')} />
            </BoxContainer>

            <BoxContainer height="h-[calc(100vh-120px)]" >
                <div className="flex justify-end my-2">
                    <NavLink
                        to={`/${routes.FORMS}/${routes.EQUIPMENT.ADD}`}
                        className="bg-green-600 hover:bg-green-700 text-white flex p-2 rounded-md transition-colors duration-200">
                        <Plus /> Agregar
                    </NavLink>
                </div>

                <div className="h-[calc(100%-60px)] overflow-y-scroll">
                    {equipments.length > 0 && equipments && equipments.map((e, idx) => <ListEquipment key={idx} e={e} OnDelete={removeTool} />)}
                </div>
            </BoxContainer>


            <Modal isOpen={openModal} onClose={onCancel} isQuestion={true} onCancel={onCancel} onConfirm={onConfirm} title="Eliminar" >
                <span className="text-center font-semibold text-lg">¿Está seguro de eliminar esta herramienta?</span>
            </Modal>
        </>
    )
}