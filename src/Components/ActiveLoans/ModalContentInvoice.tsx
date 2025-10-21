import { getLoanByPromissoryId } from "@/Services/LoanService";
import type { LoanByIdType } from "@/Types/LoanTypes";
import { useEffect, useState } from "react";
import CustomButton from "../Shared/CustomButton";
import { LoanModalContent } from "../Shared/ModalLoan";
import { CustomFormField } from "../Shared/CustomInputs";
import { type FieldErrors, type UseFormGetValues, type UseFormRegister } from "react-hook-form";
import type { IReturnFieldDate } from "@/Types/FormType";
import { requiredValidator } from "@/validations/validation";
import { useNavigate } from "react-router";
import { routes } from "@/Router/routes";
import { Modal } from "../Shared/Modal";
import toast from "react-hot-toast";

interface props {
    promissoryId: number,
    onCloser?: () => void,
    register?: UseFormRegister<IReturnFieldDate>
    error?: FieldErrors<IReturnFieldDate>
    getValues?: UseFormGetValues<IReturnFieldDate>
}

export default function ModalContentDetailLoan({ promissoryId, onCloser, register, error, getValues }: props) {
    const navigator = useNavigate()
    const [confirmationInvoice, setConfirmationInvoice] = useState(false);
    const [invoice, setInvoice] = useState<LoanByIdType>();

    useEffect(() => {
        getLoanByPromissoryId(promissoryId).then(setInvoice);
    }, [setInvoice]);


    const handlerDegress = () => {
        if (getValues!('date') !== '') {
            navigator(`/${routes.FORMS}/${routes.LEND.EDIT_RETURN}/${promissoryId}/${getValues!('date')}`)
        }
        else {
            toast.error('Requiere la fecha de devolución');
        }
    }

    const handlerRequestModal = () => {
        setConfirmationInvoice(!confirmationInvoice)
    }

    if (invoice) {
        const [day, month, year] = invoice.deliveryDate.toString().split('-')
        const isReserved = new Date() <= new Date(`${year}-${month}-${day}`)

        return (
            <div className="flex flex-col gap-4">
                <LoanModalContent.LoanDates deliveryDate={invoice.deliveryDate.toString()} deliveryReturned={invoice.deliveryReturn} />
                <LoanModalContent.ClientInformation name={invoice.clientName} document={invoice.clientCedula} address={invoice.addressClient} numberPhone={invoice.numberPhone} />

                <LoanModalContent.DeliveryInformation name={invoice.deliveryName} phone={invoice.numberPhone} />
                <LoanModalContent.LoanEquipmentsInformation equipments={invoice.loanEquipments} />
                <LoanModalContent.loanInformation deposit={invoice.deposit} deliveryPrice={invoice.deliveryPrice} total={invoice.total} totalDays={invoice.totalDays} />

                {!isReserved && error && register &&
                    <CustomFormField.InputDate id="date" type="date"
                        label="Fecha de devolución" error={error.date}
                        {...register('date', { required: requiredValidator })} />}

                {!invoice.deliveryReturn &&
                    <CustomButton
                        type="submit" onClick={handlerRequestModal}
                        classAdd="bg-green-500 hover:bg-green-600 text-white font-semibold w-full "
                        disabled={isReserved}>{isReserved ? 'Es Reserva, no puedes generar factura' : 'Generar Factura'}
                    </CustomButton>
                }



                <Modal
                    isOpen={confirmationInvoice}
                    onClose={handlerRequestModal}
                    isQuestion={true}
                    title="¿El cliente devolvió todos los equipos?"
                    confirm="Si"
                    degress="No"
                    onConfirm={onCloser}
                    onCancel={handlerDegress}>
                </Modal>

            </div >

        )
    }
}


