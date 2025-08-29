import type { ClientType } from "@/Types/ClientTypes";


export function SetClient(value: ClientType, state: ClientType) {

    return { ...value, state }
} 