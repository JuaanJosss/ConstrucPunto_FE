import Form from '@/Components/EquipmentManagement/Form';
import BoxContainer from '@/Components/Shared/BoxContainer';
import { toastMessages } from '@/helpers/toastMessages';
import { routes } from '@/Router/routes';
import { createEquipment } from '@/Services/EquipmentService';
import type { EquipmentType } from '@/Types/EquipmentTypes';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function NewEquipment() {

    const navigate = useNavigate()

    const handlerSubmit = async (equip: EquipmentType) => {
        await createEquipment(equip);
        toast.success(`¡El equipo ${toastMessages.createdSuccess}`)
        navigate(`/${routes.EQUIPMENT.EQUIPMENT_MANAGEMENT}`)
    }
    return (
        <BoxContainer height='h-[95%] p-4'>
            <Form handlerSubmit={handlerSubmit} />
        </BoxContainer>
    )
}
