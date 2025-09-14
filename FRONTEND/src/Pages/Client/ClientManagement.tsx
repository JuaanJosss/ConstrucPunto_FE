import { getCLientByIdArray, getCLientByNameArray } from "@/Services/ClientService";
import { isNumber } from "@/helpers/isNumber";
import { Modal } from "@/Components/Shared/Modal";
import { NavLink } from "react-router";
import { routes } from "@/Router/routes";
import { UserRoundPlus } from "lucide-react";
import BoxContainer from "@/Components/Shared/BoxContainer";
import ClientList from "@/Components/ClientManagenment/ClientList";
import CustomButton from "@/Components/Shared/CustomButton";
import SearcBar from "@/Components/LendPage/SearcBar";
import type { ISearchByNameOrDocument } from "@/Types/FormType";
import useClientManagementHook from "@/hooks/ClientManagementHook";

export default function ClientManagement() {
    const { clients, setClient,
        openModal, register, handleSubmit, removeClient,
        onCancel, onConfirm, errors, toggleButton,
        isFilteredActive, setIsFilteredActive } = useClientManagementHook()

    const handlerSubmit = async (form: ISearchByNameOrDocument) => {
        setIsFilteredActive(true);
        if (isNumber(form.value)) {
            await getCLientByIdArray(Number(form.value)).then(setClient);
        } else
            await getCLientByNameArray(form.value).then(setClient);
    }

    return (
        <>
            <BoxContainer>
                <SearcBar
                    handlerSubmit={handlerSubmit}
                    handleSubmit={handleSubmit}
                    {...register('value')}
                    error={errors.value}
                    label="Busca por nombre o cédula" />
            </BoxContainer>


            <BoxContainer height="h-[calc(100vh-130px)]" >
                <div className="grid grid-cols-2 gap-4 my-2 items-center">
                    {isFilteredActive && <CustomButton onClick={toggleButton} type="button" classAdd="justify-self-start  bg-gray-200 hover:bg-gray-300"> Borrar búsqueda  </CustomButton>}
                    <NavLink
                        to={`/${routes.FORMS}/${routes.CLIENT.REGISTER}`}
                        className="bg-green-600 hover:bg-green-700 text-white col-start-2 w-max flex p-2 rounded-md justify-self-end transition-colors duration-200">
                        <UserRoundPlus /> Agregar
                    </NavLink>
                </div>

                <ul className="grid grid-cols-5 place-items-center bg-green-100 p-2 rounded-t-lg font-semibold">
                    <li>Documento</li>
                    <li>Nombre</li>
                    <li>Teléfono</li>
                    <li>Dirección</li>
                    <li>Editar | Eliminar</li>
                </ul>

                {clients.length > 0 ? clients && <ClientList clients={clients} removeClient={removeClient} /> : <p>No hay registro</p>}
            </BoxContainer>


            <Modal isOpen={openModal} onClose={onCancel} isQuestion={true} onCancel={onCancel} onConfirm={onConfirm} title="Eliminar" >
                <span className="text-center font-semibold text-lg">¿Está seguro de eliminar este cliente?</span>
            </Modal>
        </>
    )
}
