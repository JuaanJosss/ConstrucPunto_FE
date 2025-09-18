import { useClientStore } from "@/Store/Client/ClientStore";
import { useState } from "react";
import { useShallow } from "zustand/shallow";


export default function useRegisterUserLend() {
    const [idClient, setIdClient] = useState<string>("");
    const [notExists, setNotExist] = useState<boolean>(false)

    const SetClientStore = useClientStore(useShallow(state => state.setCLient))
    const client = useClientStore(useShallow(state => state.client))

    return {
        client, SetClientStore,
        idClient, setIdClient,
        notExists, setNotExist,
    }
}
