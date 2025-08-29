import type { ClientType } from "@/Types/ClientTypes";
import { AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import AnimationContainer from "../Shared/AnimationContainer";
import { CustomFormField } from "../Shared/CustomInputs";
import CustomButton from "../Shared/CustomButton";


export default function ClientInformation({ clientId }: { clientId: string }) {
    const defaultValues: ClientType = {
        id: clientId,
        name: "",
        address: "",
        phone: ""
    }

    const { register, handleSubmit, formState: { errors } } = useForm<ClientType>({ defaultValues });


    const handlerSubmit = (data: ClientType) => {

    }

    return (
        <AnimatePresence>
            <AnimationContainer classToAdd="bg-white p-5 shadow-lg rounded-lg">
                <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit(handlerSubmit)}>
                    <fieldset>
                        <legend className="p-1 bg-green-900 rounded-md text-white mb-4">Información adicional</legend>
                        <div className="flex flex-col gap-4 justify-center items-center">
                            <CustomFormField.Input label="Dirección" id="Address" classAdd="w-5/12" type="text" {...register("address")} />
                            <CustomFormField.Input label="Phone" id="phone" classAdd="w-5/12" type="number" {...register("phone")} />
                        </div>

                    </fieldset>
                    <CustomButton type="submit" classAdd="w-max mx-auto bg-blue-300 hover:bg-blue-400 text-white">Guardar </CustomButton>
                </form>
            </AnimationContainer>
        </AnimatePresence>
    )
}
