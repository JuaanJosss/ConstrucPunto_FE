import type { ClientType } from "@/Types/ClientTypes";


export function SetClient(value: ClientType | null, state: ClientType) {

    if (value) {
        return { ...value, state }
    }


    return null
} 