import { API } from "@/lib/API";
import type { ILoanSearchType } from "@/Types/FormType";
import { LoanSchema, type LoanByIdType, type LoanFormType, type LoanType } from "@/Types/LoanTypes";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import z from "zod";

const CONTROLLER_URL = '/loan'

const URLS = {
    FIND_ALL: `find-all`,
    SAVE: 'save',
    FIND_LOAN: 'find-loan',
    GENERATE_INVOICE: 'return-equipment',
    FILTER: 'filter',
    PARTIAL_RETURN: 'partial-return-equipment'
}

export async function createLoan(loan: LoanFormType) {
    try {
        const body = loan.delivery?.name !== '' ? createBody(loan, true) : createBody(loan, false);
        console.log(body);

        const response = await API.post(`${CONTROLLER_URL}/${URLS.SAVE}`, body);
        return response.status
    } catch (error: any) {
        return error.status
    }
}

export async function createNewLoanAndGenerate(promissoryNoteId: string, body: { equipmentId: string, quantity: string }[]) {
    try {
        const response = await API.post(`${CONTROLLER_URL}/${URLS.PARTIAL_RETURN}/${promissoryNoteId}`, body);
        return response.status
    } catch (error: any) {
        throw error;
    }
}


export async function createInvoice(promissoryNoteId: number) {
    try {
        const response = await API.post(`${CONTROLLER_URL}/${URLS.GENERATE_INVOICE}/${promissoryNoteId}`);
        return response.status
    } catch (error: any) {

        throw error;
    }
}

export async function getLoans(isActive: boolean) {
    try {
        const response = await API.get<LoanType[]>(`${CONTROLLER_URL}/${URLS.FIND_ALL}`,
            {
                params: { active: isActive }
            });
        return response.data
    } catch (error: any) {
        throw error;
    }
}

export async function getLoanPerDocumentOrDate(data: ILoanSearchType, IsActive: boolean) {
    try {
        const params = createParam(data, IsActive);
        console.log(params);

        const response = await API.get<LoanType[]>(`${CONTROLLER_URL}/${URLS.FILTER}`, { params });


        const parsed = z.array(LoanSchema).safeParse(response.data);
        if (!parsed.success) {
            return getLoans(IsActive)
        }

        return parsed.data
    } catch (error) {
        const e = error as AxiosError<{ message?: string }>

        if (e.response?.data?.message) {
            if (IsActive) {
                toast.error(`${e.response.data.message}`)
            }
            else {
                toast.error(`No hay registro relacionado con el filtro`)
            }
        }
        else {
            toast.error(`No es posible hacer esto ahora`)
        }

        return []
    }
}

export async function getLoanByPromissoryId(promissoryId: number) {
    try {
        const response = await API.get<LoanByIdType>(`${CONTROLLER_URL}/${URLS.FIND_LOAN}`, {
            params: { promissoryId }
        })

        return response.data
    } catch (error: any) {

        throw error;
    }
}


function createParam(data: ILoanSearchType, IsActive: boolean) {

    if (data.date === '') {
        return {
            "client-cedula": data.document,
            active: IsActive
        }
    } else if (data.document === '') {
        return {
            "delivery-date": data.date,
            active: IsActive
        }
    }
    else {
        return {
            "client-cedula": data.document,
            "delivery-date": data.date,
            active: IsActive
        }
    }
}


function createBody(loan: LoanFormType, existeDelivery: boolean) {
    if (existeDelivery) {
        return {
            clientId: loan.clientId,
            deposit: loan.deposit,
            delivery: {
                cedula: loan.deliveryCedula,
                name: loan.delivery?.name,
                phoneNumber: loan.delivery?.phoneNumber,
            },
            deliveryPrice: loan.deliveryPrice,
            comments: loan.comments,
            equipmentIds: loan.equipmentIds
        }
    }

    return {
        clientId: loan.clientId,
        deposit: loan.deposit,
        deliveryCedula: loan.deliveryCedula,
        deliveryPrice: loan.deliveryPrice,
        comments: loan.comments,
        equipmentIds: loan.equipmentIds
    }
}