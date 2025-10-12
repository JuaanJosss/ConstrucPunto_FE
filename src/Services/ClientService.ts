import { API } from "@/lib/API";
import { ClientSchema, type ClientType } from "@/Types/ClientTypes";
import toast from "react-hot-toast";
import z from "zod";

const CONTROLLER_URL = '/client';

const URLS = {
    FIND_ALL: 'find-all',
    FIND_BY_ID: 'find-by',
    SAVE: 'save',
};

export async function getClients() {
    try {
        const response = await API.get<ClientType[]>(`${CONTROLLER_URL}/${URLS.FIND_ALL}`);

        const isValid = z.array(ClientSchema).safeParse(response.data)

        if (!isValid.success) {
            throw new Error(`Validation error: ${JSON.stringify(isValid.error)}`)
        }

        return isValid.data
    } catch (error: any) {
        if (error.response) {
            console.error("Status del backend:", error.response.status);
            console.error("Datos del backend:", error.response.data);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("No hubo respuesta del servidor, request:", error.request);
        } else {
            console.error("Error configurando la petición:", error.message);
        }


        throw error;
    }
}

export async function getCLientById(id: ClientType['id']) {
    try {
        const response = await API<ClientType>(`${CONTROLLER_URL}/${URLS.FIND_BY_ID}`, {
            params: {
                "client-cedula": id,
            }
        });
        const isValid = ClientSchema.safeParse(response.data);

        if (!isValid.success) {
            toast.error(`No hay registros con el documento: ${id}`)
            return null
        }

        return isValid.data
    } catch (error: any) {

        throw error;
    }
}

export async function getCLientByName(name: ClientType['name']) {
    try {
        const response = await API<ClientType>(`${CONTROLLER_URL}/${URLS.FIND_BY_ID}`, {
            params: {
                "client-name": name
            }
        });
        const isValid = ClientSchema.safeParse(response.data);
        if (!isValid.success) {
            toast.error(`No hay registros con el nombre: ${name}`)
            return null
        }

        return isValid.data
    } catch (error: any) {
        throw error;
    }
}




export async function getCLientByIdArray(id: ClientType['id']) {
    try {
        const response = await API<ClientType[]>(`${CONTROLLER_URL}/${URLS.FIND_BY_ID}`, {
            params: {
                "client-cedula": id,
            }
        });
        const isValid = z.array(ClientSchema).safeParse([response.data]);

        if (!isValid.success) {
            toast.error(`No hay registros con el documento: ${id}`)
            return await getClients();
        }

        return isValid.data
    } catch (error: any) {

        throw error;
    }
}

export async function getCLientByNameArray(name: ClientType['name']) {
    try {
        const response = await API<ClientType[]>(`${CONTROLLER_URL}/${URLS.FIND_BY_ID}`, {
            params: {
                "client-name": name.toLowerCase()
            }
        });

        const isValid = z.array(ClientSchema).safeParse(response.data);

        if (!isValid.success) {
            toast.error(`No hay registros con el nombre: ${name}`)
            return await getClients();
        }

        return isValid.data
    } catch (error: any) {
        throw error;
    }
}




export async function saveClient(client: ClientType) {
    try {
        const response = await API.post<ClientType>(`${CONTROLLER_URL}/${URLS.SAVE}`,
            client);

        if (response.status === 201) {
            return true
        }

        throw new Error(`Validation error: No es posible actualizar`)
    } catch (error) {

        throw error;
    }
}


export async function updateClient(client: ClientType, id: ClientType['id']) {
    try {
        const response = await API.post<ClientType>(`${CONTROLLER_URL}/${URLS.SAVE}`,
            client,
            { params: { "oldID": id } }
        );

        if (response.status === 201) {
            return true
        }

        throw new Error(`Validation error: No es posible actualizar`)
    } catch (error) {
        throw error;
    }
}


export async function deleteClient(id: ClientType['id']) {
    try {
        await API.delete<ClientType>(`${CONTROLLER_URL}/${id}`);
    } catch (error) {
        throw error;
    }
}