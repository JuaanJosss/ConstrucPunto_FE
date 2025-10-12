import { API } from "@/lib/API";
import { EquipmentSchema, type EquipmentType } from "@/Types/EquipmentTypes";
import toast from "react-hot-toast";
import z from "zod";

const CONTROLLER_URL = '/equipment'
const URLS = {
    FIND_ALL: `find-all`,
    FIND_BY_ID: 'find-by-',
    FILTER: 'filter',
    DELETE: 'delete',
    SAVE: 'save'
}

export async function getEquipment() {
    try {
        const response = await API.get<EquipmentType[]>(`${CONTROLLER_URL}/${URLS.FIND_ALL}`);


        return response.data

    } catch (error) {
        throw error;
    }
}

export async function getEquipmentById(id: EquipmentType['id']) {
    try {
        const response = await API.get<EquipmentType>(`${CONTROLLER_URL}/${URLS.FIND_BY_ID}/${id}`);

        const parsed = EquipmentSchema.safeParse(response.data);

        if (!parsed.success) {
            toast.error('No se puede hacer la acción intentelo más tarde')
        }

        return parsed.data
    } catch (error) {
        throw error;
    }
}

export async function getEquipmentByName(name: EquipmentType['name']) {
    try {
        const response = await API.get<EquipmentType[]>(`${CONTROLLER_URL}/${URLS.FILTER}`, {
            params: { "name": name }
        });
        const parsed = z.array(EquipmentSchema).safeParse(response.data);

        if (!parsed.success) {
            toast.error('No se puede hacer la acción intentelo más tarde');
            return [];
        }

        return parsed.data
    } catch (error) {
        throw error;
    }
}


export async function createEquipment(body: EquipmentType) {
    try {
        const response = await API.post<EquipmentType>(`${CONTROLLER_URL}/${URLS.SAVE}`, body);
        return response.data
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

export async function deleteEquipment(id: EquipmentType['id']) {
    try {
        const response = await API.delete(`${CONTROLLER_URL}/${URLS.DELETE}/${id}`);

        return response.data
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


