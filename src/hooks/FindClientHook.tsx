import { routes } from "@/Router/routes";
import { getCLientById } from "@/Services/ClientService";
import { useClientStore } from "@/Store/Client/ClientStore";
import type { ClientType } from "@/Types/ClientTypes";
import type { ISearchDocumentType } from "@/Types/FormType";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useShallow } from "zustand/shallow";


export default function useFindClientHook() {
    const navigate = useNavigate();
    const params = useParams();
    const setClient = useClientStore(useShallow(state => state.setCLient));
    const setDocument = useClientStore(useShallow(state => state.setDocument));
    const clientStore = useClientStore(useShallow(state => state.client));

    useEffect(() => {
        if (!params.document)
            return;

        getCLientById(Number(params.document)).then(setClient)

    }, [params, setClient])

    useEffect(() => {
        if (clientStore) {
            navigate(`/${routes.FORMS}/${routes.LEND.ADD}`, { replace: true })
        }
    }, [clientStore])

    const handlerSubmit = async (answer: ISearchDocumentType) => {
        const client: ClientType | null = await getCLientById(Number(answer.id));

        if (!client) {
            setDocument(Number(answer.id))
            toast.error('Usuario no encontrado')
            navigate(`/${routes.FORMS}/${routes.CLIENT.REGISTER_LOAN}`)
        } else {
            setClient(client);
            navigate(`/${routes.FORMS}/${routes.LEND.ADD}`, { replace: true });
        }
    }

    return {
        handlerSubmit
    }
}
