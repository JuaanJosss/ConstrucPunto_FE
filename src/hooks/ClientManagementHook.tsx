import { deleteClient, getClients } from '@/Services/ClientService';
import type { ClientType } from '@/Types/ClientTypes';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useClearSearchbarHook from './ClearSearchbarHook';
import { useForm } from 'react-hook-form';
import type { ISearchByNameOrDocument } from '@/Types/FormType';

export default function useClientManagementHook() {
    const [clients, setClient] = useState<ClientType[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [clientId, setClientId] = useState<number | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ISearchByNameOrDocument>({ defaultValues: { value: '' } })
    const { toggleButton, isFilteredActive, setIsFilteredActive } = useClearSearchbarHook({ setArrayValue: setClient, func: getClients, reset })


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
        errors,
        handleSubmit,
        isFilteredActive,
        onCancel,
        onConfirm,
        openModal,
        register,
        removeClient,
        setClient,
        setIsFilteredActive,
        toggleButton
    }
}
