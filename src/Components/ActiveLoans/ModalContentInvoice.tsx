import { getLoanByPromissoryId } from "@/Services/LoanService";
import type { LoanByIdType } from "@/Types/LoanTypes";
import { useEffect, useState } from "react";
import CustomButton from "../Shared/CustomButton";
import { Modal } from "../Shared/Modal";
import { useNavigate } from "react-router";
import { routes } from "@/Router/routes";
import { LoanModalContent } from "../Shared/ModalLoan";

export default function ModalContentDetailLoan({ promissoryId, onCloser }: { promissoryId: number, onCloser?: () => Promise<void> }) {
    const navigator = useNavigate();
    const [invoice, setInvoice] = useState<LoanByIdType>();
    const [confirmationInvoice, setConfirmationInvoice] = useState(false);


    useEffect(() => {
        getLoanByPromissoryId(promissoryId).then(setInvoice);
    }, [setInvoice]);


    const handlerRequestModal = () => {
        setConfirmationInvoice(!confirmationInvoice)
    }


    const handlerDegress = () => {
        navigator(`/${routes.FORMS}/${routes.LEND.EDIT_RETURN}/${promissoryId}`)
    }

    if (invoice) {
        return (
            <div className="flex flex-col gap-4">
                <LoanModalContent.LoanDates deliveryDate={invoice.deliveryDate.toString()} deliveryReturned={invoice.deliveryReturn} />
                <LoanModalContent.ClientInformation name={invoice.clientName} document={invoice.clientCedula} address={invoice.addressClient} numberPhone={invoice.numberPhone} />

                <LoanModalContent.DeliveryInformation name={invoice.deliveryName} phone={invoice.numberPhone} />

                <LoanModalContent.LoanEquipmentsInformation equipments={invoice.loanEquipments} />
                <LoanModalContent.loanInformation deposit={invoice.deposit} deliveryPrice={invoice.deliveryPrice} total={invoice.total} totalDays={invoice.totalDays} />

                {onCloser && <CustomButton type="button" onClick={handlerRequestModal} classAdd="bg-green-500 hover:bg-green-600 text-white font-semibold w-full">Generar factura </CustomButton>}

                <Modal isOpen={confirmationInvoice}
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
