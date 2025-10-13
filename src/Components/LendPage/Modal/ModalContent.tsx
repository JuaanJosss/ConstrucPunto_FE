import { CustomFormField } from "@/Components/Shared/CustomInputs";
import { formatCurrency } from "@/helpers/formatters";
import { useForm } from "react-hook-form";
import CustomButton from "../../Shared/CustomButton";
import TableOfToolsModal from "./ListOfToolsModal";
import type { ClientType } from "@/Types/ClientTypes";
import type { EquipmentTypeToListType } from "@/Types/EquipmentTypes";
import { useEffect, useState } from "react";
import type { LoanFormType } from "@/Types/LoanTypes";
import Paragraph from "@/Components/Shared/Paragraph";
import { AnimatePresence } from "motion/react";
import AnimationContainer from "@/Components/Shared/AnimationContainer";
import { numberPatternValidator, onlyLettersPatternValidator, requiredValidator } from "@/validations/validation";
import { getDeliveryById } from "@/Services/DeliveryService";
import toast from "react-hot-toast";

interface IModalContentProps {
    client: ClientType;
    toolsList: EquipmentTypeToListType[];
    handlerSubmit: (data: LoanFormType) => Promise<void>
}

export function ModalContent({ client, toolsList, handlerSubmit }: IModalContentProps) {
    const [clicked, setClicked] = useState<boolean>(false)
    const [existsDelivery, setExistsDelivery] = useState(false);

    const total = toolsList.reduce((total, tool) => (tool.quantity * tool.unitPrice) + total, 0);
    const defaultValues: LoanFormType = {
        deliveryCedula: 0,
        deliveryPrice: 0,
        clientId: client.id,
        deposit: 0,
        comments: "",
        date: "",
        equipmentIds: {},
        delivery: {
            cedula: 0,
            name: '',
            phoneNumber: ''
        }
    }
    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm<LoanFormType>({ defaultValues });
    useEffect(() => {
        const record: Record<string, number> = {}
        toolsList.forEach(t => {
            record[t.id!.toString()] = t.quantity;
        });
        setValue('equipmentIds', record);
    }, [toolsList, setValue])



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

        <div className="flex flex-col p-2 gap-5">
            <div className="grid grid-cols-2 grid-rows-3">
                <h4 className="font-semibold text-xl">Datos del cliente</h4>
                <Paragraph classes="row-start-2" section="Nombre" text={client.name} />
                <Paragraph classes="row-start-2" section="Documento" text={client.cedula} />
                <Paragraph classes="row-start-3" section="Teléfono" text={client.numberPhone} />
                <Paragraph classes="row-start-3" section="Dirección" text={client.address} />
            </div>
            <TableOfToolsModal toolsList={toolsList} />
            <span className="font-bold text-end">Total: {formatCurrency(total)}</span>
            <form onSubmit={handleSubmit(handlerSubmit)} className="space-y-5">
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



                <div className="flex gap-4">
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
                    <CustomFormField.Input
                        label="Fecha"
                        type="date"
                        id="date"
                        {...register('date', {
                            required: requiredValidator
                        })}
                        error={errors.date} />
                </div>
                <CustomButton type="submit" classAdd="bg-green-500 hover:bg-green-600 text-white font-semibold w-full">Terminar Proceso e imprimir</CustomButton>
            </form>
        </div>
    )

}