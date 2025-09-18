import Form from "@/Components/ClientManagenment/Form"
import BoxContainer from "@/Components/Shared/BoxContainer"
import { toastMessages } from "@/helpers/toastMessages"
import { routes } from "@/Router/routes"
import { saveClient } from "@/Services/ClientService"
import { useClientStore } from "@/Store/Client/ClientStore"
import type { ClientType } from "@/Types/ClientTypes"
import toast from "react-hot-toast"
import { useLocation, useNavigate, } from "react-router"
import { useShallow } from "zustand/shallow"

export default function NewClient() {
    const navigate = useNavigate();
    const location = useLocation();
    const setClient = useClientStore(useShallow(s => s.setCLient))

    const handlerSubmit = async (data: ClientType) => {
        await saveClient(data);
        setClient(data);
        toast.success(`¡El usuario ${toastMessages.createdSuccess}`)

        location.pathname === `/${routes.FORMS}/${routes.CLIENT.REGISTER_LOAN}` ?
            navigator(`/${routes.FORMS}/${routes.CLIENT.FIND}/${data.cedula}`) :
            navigator(`/${routes.CLIENT.CLIENT_MANAGEMENT}`)
    }


    const navigator = (route: string) => {
        navigate(route, { replace: true })
    }

    return (
        <BoxContainer height='h-[95%] p-4'>
            <Form handlerSubmit={handlerSubmit} />
        </BoxContainer>
    )
}
