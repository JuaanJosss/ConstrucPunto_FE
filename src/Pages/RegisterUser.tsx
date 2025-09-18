import { useState } from "react";
import { Navigate } from "react-router";
import { routes } from "@/Router/routes";

import type { ClientType } from "@/Types/ClientTypes";
import SearchDocument from "@/Components/Forms/SearchDocument";
import ClientInformation from "@/Components/Forms/ClientInformation";

export default function RegisterUser() {
    const [client, setClient] = useState<ClientType>({ id: 0, address: "", name: "", phone: "" });
    const [notExists, setNotExist] = useState<boolean>(true)

    if (client) {
        return <Navigate to={`/${routes.FORMS}/${routes.ADD_LEND}`} replace={true} />
    }



    return (
        <>
            <SearchDocument setClient={setClient} setState={setNotExist} />

            {notExists && (
                <ClientInformation clientId={client.id} />
            )}
        </>
    )
}
