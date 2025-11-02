import { formatCurrency } from "@/helpers/formatters";
import { useForm } from "react-hook-form";
import CustomButton from "../../Shared/CustomButton";
import TableProductsLean from "./ListOfToolsModal";
import type { ClientType } from "@/Types/ClientTypes";
import type { EquipmentTypeToListType } from "@/Types/EquipmentTypes";
import { useEffect } from "react";
import type { LoanFormType } from "@/Types/LoanTypes";
import Paragraph from "@/Components/Shared/Paragraph";
import FormModal from "./FormModal";

interface IModalContentProps {
    client: ClientType;
    toolsList: EquipmentTypeToListType[];
    handlerSubmit: (data: LoanFormType) => Promise<void>
}

export function ModalContent({ client, toolsList, handlerSubmit }: IModalContentProps) {

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


    return (

        <div className="flex flex-col p-2 gap-5">
            <div className="grid grid-cols-2 grid-rows-3">
                <h4 className="font-semibold text-xl">Datos del cliente</h4>
                <Paragraph classes="row-start-2" section="Nombre" text={client.name} />
                <Paragraph classes="row-start-2" section="Documento" text={client.cedula} />
                <Paragraph classes="row-start-3" section="Teléfono" text={client.numberPhone} />
                <Paragraph classes="row-start-3" section="Dirección" text={client.address} />
            </div>
            <TableProductsLean toolsList={toolsList} />

            <span className="font-bold text-end">Total: {formatCurrency(total)}</span>

            <form onSubmit={handleSubmit(handlerSubmit)} className="space-y-5">
                <FormModal register={register} errors={errors} getValues={getValues} />
                <CustomButton type="submit" classAdd="bg-green-500 hover:bg-green-600 text-white font-semibold w-full">Terminar Proceso e imprimir</CustomButton>
            </form>
        </div>
    )

}