import { deleteClient, getClients } from '@/Services/ClientService';
import type { ClientType } from '@/Types/ClientTypes';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useClearSearchbarHook from './ClearSearchbarHook';

export default function useClientManagementHook() {
    const [clients, setClient] = useState<ClientType[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [clientId, setClientId] = useState<number | null>(null);
    const { toggleButton, isFilteredActive, setIsFilteredActive, errors, handleSubmit, register } = useClearSearchbarHook({ setArrayValue: setClient, func: getClients })


    useEffect(() => {
        getClients().then(setClient);
    }, [])


    const removeClient = (id: number) => {
        setClientId(id);
        setOpenModal(true);
    }

    const onConfirm = async () => {
        if (clientId === null) return;
        await deleteClient(clientId);
        await getClients().then(setClient);
        setOpenModal(false);
        toast.success('Se eliminó correctamente');
    }

    const onCancel = () => {
        setOpenModal(false)
    }


    return {
        clients,
        setClient,
        openModal,
        removeClient,
        onConfirm,
        onCancel,
        handleSubmit,
        register,
        errors,
        isFilteredActive,
        setIsFilteredActive,
        toggleButton
    }
}
