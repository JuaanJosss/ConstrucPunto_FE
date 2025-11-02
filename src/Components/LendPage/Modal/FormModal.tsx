import AnimationContainer from "@/Components/Shared/AnimationContainer";
import CustomButton from "@/Components/Shared/CustomButton";
import { CustomFormField } from "@/Components/Shared/CustomInputs";
import { getDeliveryById } from "@/Services/DeliveryService";
import type { LoanFormType } from "@/Types/LoanTypes";
import { numberPatternValidator, onlyLettersPatternValidator, requiredValidator } from "@/validations/validation";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import type { FieldErrors, UseFormGetValues, UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";

interface FormProps {
    register: UseFormRegister<LoanFormType>;
    errors: FieldErrors<LoanFormType>;
    getValues: UseFormGetValues<LoanFormType>

}

export default function FormModal({ register, errors, getValues }: FormProps) {
    const [clicked, setClicked] = useState<boolean>(false)
    const [existsDelivery, setExistsDelivery] = useState(false);

    const validateDelivery = async () => {
        const idDelivery = getValues('deliveryCedula')
        const status = await getDeliveryById(Number(idDelivery))

        if (!status)
            toast.success('El domiciliario existe')
        else
            toast.error('El domiciliario no existe, digite los datos');

        setExistsDelivery(status);
    }

    return (
        <>
            <p className="flex gap-2 items-center">¿Requiere domicilio?
                <span onClick={() => setClicked(!clicked)}
                    className={`content-[''] size-5 border-2 rounded-3xl transition-colors duration-300 hover:border-blue-500 hover:cursor-pointer 
                            ${clicked ? 'bg-blue-300 border-blue-500' : ''}`}></span>
            </p>
            <AnimatePresence>
                {clicked &&
                    <AnimationContainer classToAdd="bg-white flex gap-4">
                        <div className="flex items-end gap-4">
                            <CustomFormField.Input
                                label="Cédula del domiciliario"
                                type="number"
                                id="DeliveryCedeula"
                                {...register('deliveryCedula', { pattern: numberPatternValidator })}
                                error={errors.deliveryCedula} />
                            <CustomButton type="button" onClick={validateDelivery} classAdd="bg-blue-500 hover:bg-blue-600 text-white">Buscar</CustomButton>
                            <CustomFormField.Input
                                label="Flete"
                                type="number"
                                id="deliveryPrice"
                                classAdd="w-6/12"
                                {...register('deliveryPrice', { pattern: numberPatternValidator })}
                                error={errors.deliveryPrice} />
                        </div>
                    </AnimationContainer>}
            </AnimatePresence>

            <AnimatePresence>
                {existsDelivery && clicked &&
                    <AnimationContainer classToAdd="bg-white flex gap-4">
                        <CustomFormField.Input
                            label="Nombre"
                            id="DeliveryName"
                            classAdd="w-6/12"
                            {...register('delivery.name', { pattern: onlyLettersPatternValidator })}
                            error={errors.delivery?.name} />
                        <CustomFormField.Input
                            label="Teléfono"
                            type="number"
                            id="deliveryPhone"
                            classAdd="w-6/12"
                            {...register('delivery.phoneNumber', { pattern: numberPatternValidator })}
                            error={errors.delivery?.phoneNumber} />
                    </AnimationContainer>}
            </AnimatePresence>



            <div className="flex gap-3">
                <CustomFormField.Input
                    label="Deposito"
                    type="number"
                    id="deposit"
                    classAdd="w-full"
                    {...register('deposit',
                        { pattern: numberPatternValidator, required: requiredValidator })}
                    error={errors.deposit} />
                <CustomFormField.Input label="Comentarios"
                    type="text"
                    id="comments"
                    classAdd="w-full"
                    {...register('comments',
                        { pattern: onlyLettersPatternValidator })}
                    error={errors.comments} />
                <CustomFormField.InputDate label="Fecha"
                    type="date"
                    id="date"
                    {...register('date', {
                        required: requiredValidator
                    })}
                    error={errors.date} />
            </div>
        </>
    )
}

