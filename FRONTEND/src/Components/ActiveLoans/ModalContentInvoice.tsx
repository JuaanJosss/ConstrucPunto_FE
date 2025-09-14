import { formatCurrency } from "@/helpers/formatters";
import { getLoanByPromissoryId } from "@/Services/LoanService";
import type { LoanByIdType } from "@/Types/LoanTypes";
import { useEffect, useState } from "react";
import CustomButton from "../Shared/CustomButton";
import Paragraph from "../Shared/Paragraph";
import { Modal } from "../Shared/Modal";
import { useNavigate } from "react-router";
import { routes } from "@/Router/routes";


export default function ModalContentDetailLoan({ promissoryId, onCloser }: { promissoryId: number, onCloser?: () => Promise<void> }) {
    const navigator = useNavigate();
    const [invoice, setInvoice] = useState<LoanByIdType>();
    const [confirmationInvoice, setConfirmationInvoice] = useState(false)


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
        const totalgave = invoice.deposit === 0 ? 0 : invoice.deposit - invoice.total!

        return (
            <div className="flex flex-col gap-4">
                <Paragraph section="Fecha" text={invoice.deliveryDate.toString()} />
                <div id="client">
                    <h4 className="text-xl font-semibold">Datos del Cliente</h4>
                    <ul className="mx-4">
                        <li><Paragraph section="Documento" text={invoice.clientCedula} /> </li>
                        <li><Paragraph section="Nombre" text={invoice.clientName} /> </li>
                        <li><Paragraph section="Teléfono" text={invoice.numberPhone} /> </li>
                        <li><Paragraph section="Dirección" text={invoice.addressClient} /> </li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h4 className="text-xl font-semibold">Información de préstamo</h4>
                    <div className="mx-4">
                        <ul className="grid grid-cols-5 place-items-center w-full font-semibold border-b ">
                            <li>Nombre</li>
                            <li>Cantidad</li>
                            <li>Valor Unidad</li>
                            <li>Valor Día</li>
                            <li>Total por día</li>
                        </ul>
                        <div className="w-full max-h-72 overflow-y-auto">
                            {invoice.loanEquipments.map((tool, i) => (
                                <ul
                                    key={i}
                                    className="grid grid-cols-5 place-items-center w-full border-b border-gray-300 p-1"
                                >
                                    <li>{tool[1]}</li>
                                    <li>{tool[0]}</li>
                                    <li>{formatCurrency(tool[2])}</li>
                                    <li>{formatCurrency(tool[3])}</li>
                                    <li>{formatCurrency(tool[4])}</li>
                                </ul>
                            ))}
                        </div>
                    </div>
                    <div className="text-end flex flex-col">
                        {invoice.deposit !== 0 && <Paragraph section={'Depósito'} text={formatCurrency(invoice.deposit)} />}
                        <Paragraph section={'Precio domicilio'} text={formatCurrency(invoice.deliveryPrice)} />
                        {invoice.totalDays && <Paragraph section={'Dias de prestamo'} text={`${invoice.totalDays}`} />}
                        {invoice.total && <Paragraph section={'Total'} text={formatCurrency(invoice.total)} />}
                        {invoice.total && <Paragraph section={'Devolución'} text={formatCurrency(totalgave)} />}
                    </div>

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

                </div>

            </div >

        )
    }
}
