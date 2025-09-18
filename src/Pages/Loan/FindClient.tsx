import { useForm } from "react-hook-form";

import { numberPattern } from "@/Patterns/formsPatterns";

import BoxContainer from "@/Components/Shared/BoxContainer";
import SearcBar from "@/Components/LendPage/SearcBar";
import type { ISearchDocumentType } from "@/Types/FormType";
import useFindClientHook from "@/hooks/FindClientHook";


export default function FindClient() {
    const { handlerSubmit } = useFindClientHook()

    const defaultValues: ISearchDocumentType = {
        id: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

    return (
        <BoxContainer >
            <SearcBar
                label="Digite el documento del cliente"
                handleSubmit={handleSubmit}
                handlerSubmit={handlerSubmit}
                error={errors.id}
                {...register('id', {
                    required: { value: true, message: "Este campo es requerido" },
                    pattern: { value: numberPattern.reGex, message: numberPattern.message }
                })} />
        </BoxContainer>
    )
}
