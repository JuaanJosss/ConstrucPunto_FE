import { useForm } from "react-hook-form";
import { Search } from "lucide-react";

import { CustomFormField } from "../Shared/CustomInputs";
import CustomButton from "../Shared/CustomButton";
import { DataBD } from "@/data/data";
import type { SearchDocumentType } from "@/Types/FormType";
import type { ClientType } from "@/Types/ClientTypes";

type SearchDocumentProp = {
    setClient: (client: ClientType) => void
    setState: (state: boolean) => void
}

export default function SearchDocument({ setClient, setState }: SearchDocumentProp) {
    const documentForm: SearchDocumentType = {
        id: ""
    } as const

    const { register, handleSubmit, formState: { errors } } = useForm<SearchDocumentType>({ defaultValues: documentForm })

    const handlerSubmit = (data: SearchDocumentType) => {
        const isExist = DataBD.find(c => c.id === data.id);

        if (!isExist)
            return

        setState(true)
        setClient(isExist)
    }

    return (
        <form onSubmit={handleSubmit(handlerSubmit)}
            className="bg-white p-5 rounded-xl shadow-lg mb-5 flex items-center justify-center gap-5">
            <CustomFormField.Input label="Cédula del cliente"
                id="document"
                classAdd="w-4/12"
                type="number"
                {...register("id")} />
            <CustomButton
                type="submit"
                classAdd="relative top-[13px] bg-blue-200 hover:bg-blue-300 transition-colors duration-300">
                <Search /> Buscar
            </CustomButton>
        </form>
    )
}
