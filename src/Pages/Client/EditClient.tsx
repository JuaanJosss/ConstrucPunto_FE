import Form from '@/Components/ClientManagenment/Form'
import BoxContainer from '@/Components/Shared/BoxContainer'
import { toastMessages } from '@/helpers/toastMessages'
import { routes } from '@/Router/routes'
import { getCLientById, saveClient } from '@/Services/ClientService'
import type { ClientType } from '@/Types/ClientTypes'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router'

export default function EditClient() {
    const params = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState<ClientType | undefined>(undefined);

    useEffect(() => {
        if (!params.id) {
            navigate(routes.CLIENT.CLIENT_MANAGEMENT)
        }
    }, [params.id, navigate])

    useEffect(() => {
        if (!params.id) {
            return
        }

        const id = parseInt(params.id);

        async function clientById() {
            const data = await getCLientById(id);
            setClient(data!);
        }

        clientById();
    }, [params.id])

    const handlerSubmit = async (data: ClientType) => {
        await saveClient(data);
        toast.success(`¡El usuario ${toastMessages.updatedSuccess}`)
        navigate(`/${routes.CLIENT.CLIENT_MANAGEMENT}`)
    }

    return (
        <BoxContainer height='h-[95%] p-4'>
            {client && (
                <Form handlerSubmit={handlerSubmit} client={client} />
            )}
        </BoxContainer>
    )
}
