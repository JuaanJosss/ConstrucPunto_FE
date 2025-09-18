import { API } from "@/lib/API";

const CONTROLLER_URL = 'delivery'
const URLS = {
    FIND_BY_ID: 'find-by-cc'
}


export async function getDeliveryById(id: number) {
    try {
        const response = await API(`${CONTROLLER_URL}/${URLS.FIND_BY_ID}/${id}`);
        if (response.status === 200) {
            return false
        }
        return true

    } catch (error: any) {

        return true
    }
}