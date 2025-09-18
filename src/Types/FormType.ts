
export type ISearchDocumentType = {
    id: string
}

export type ISearchByNameOrDocument = {
    value: string;
}

export interface IFindEquipmentByName {
    equipment: string;
}

export type ILoanSearchType = {
    document: string;
    date: string;
}

export interface INoReturnedFieldForm {
    equipment: string;
    quantityNoReturned: string
}