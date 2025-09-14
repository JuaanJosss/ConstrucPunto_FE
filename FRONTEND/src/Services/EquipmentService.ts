import { API } from "@/lib/API";
import type { EquipmentType } from "@/Types/EquipmentTypes";

const CONTROLLER_URL = '/equipment'
const URLS = {
    FIND_ALL: `find-all`,
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

export async function getEquipmentById() {
    try {
        const response = await API.get<EquipmentType>(`${CONTROLLER_URL}/${URLS.FIND_ALL}`);


        return response.data
    } catch (error) {
        throw error;
    }
}


export async function createEquipment(body: EquipmentType) {
    console.log(`${CONTROLLER_URL}/${URLS.SAVE}`);


    try {
        const response = await API.post<EquipmentType>(`${CONTROLLER_URL}/${URLS.SAVE}`, body);

        console.log(response.status);


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

export async function deleteEquipment(id: number) {
    try {
        const response = await API.delete(`${CONTROLLER_URL}/${id}`);

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


