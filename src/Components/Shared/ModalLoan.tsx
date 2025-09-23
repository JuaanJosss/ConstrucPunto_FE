import { formatCurrency } from "@/helpers/formatters";
import Paragraph from "./Paragraph";

export function ClientInformation({ name, document, numberPhone, address }: { name: string, document: number, numberPhone: string, address: string }) {

    return (
        <div className="grid grid-cols-2 grid-rows-3 bg-gray-100 p-1">
            <h4 className="font-semibold text-xl">Datos del cliente</h4>
            <Paragraph classes="row-start-2" section="Nombre" text={name} />
            <Paragraph classes="row-start-2" section="Documento" text={document} />
            <Paragraph classes="row-start-3" section="Teléfono" text={numberPhone} />
            <Paragraph classes="row-start-3" section="Dirección" text={address} />
        </div>
    )

}


export function DeliveryInformation({ name, phone }: { name: string, phone: string | null }) {
    return (
        <>
            {name && phone && (
                <div className="grid grid-cols-2 grid-rows-3">
                    <h4 className="font-semibold text-xl">Datos del domiciliario</h4>
                    <Paragraph classes="row-start-2" section="Nombre" text={name} />
                    <Paragraph classes="row-start-2" section="Teléfono" text={phone} />
                </div>)
            }
        </>
    )

}
export function LoanDates({ deliveryDate, deliveryReturned }: { deliveryDate: string, deliveryReturned: string | null }) {
    return (
        <div className="flex justify-between" >
            <Paragraph section="Fecha" text={deliveryDate} />
            {deliveryReturned && <Paragraph section="Fecha retorno" text={deliveryReturned} />}
        </div>
    )
}



export function LoanEquipmentsInformation({ equipments }: { equipments: string[][] }) {
    return (
        <div className="space-y-2">
            <h4 className="text-xl font-semibold">Información de préstamo</h4>
            <div className="mx-4">
                <ul className="grid grid-cols-5 place-items-center w-full font-semibold border-b ">
                    <li>Nombre</li>
                    <li>Cantidad</li>
                    <li>Valor Unidad</li>
                    <li>Valor Día</li>
                    <li>Total</li>
                </ul>
                <div className="w-full max-h-24 overflow-y-auto">
                    {equipments.map((tool, i) => (
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
        </div>
    )
}


export function loanInformation({ deposit, deliveryPrice, totalDays, total }: { deposit: number, deliveryPrice: number, totalDays: string | null, total: number | null }) {

    const totalDevolution = deposit - total!
    return (

        <div className="text-end flex flex-col">
            {deposit !== 0 && <Paragraph section={'Depósito'} text={formatCurrency(deposit)} />}
            {deliveryPrice > 0 ? <Paragraph section={'Precio domicilio'} text={formatCurrency(deliveryPrice)} /> : <span className="text-gray-600">No tuvo domicilio</span>}
            {totalDays && <Paragraph section={'Dias de prestamo'} text={`${totalDays}`} />}
            {total && <Paragraph section={'Total'} text={formatCurrency(total)} />}
            {total && <Paragraph section={totalDevolution > 0 ? 'Total a devolver' : 'Total a cobrar'} text={`${formatCurrency(totalDevolution)}`} />}
        </div>
    )
}




export const LoanModalContent = {
    ClientInformation,
    DeliveryInformation,
    LoanEquipmentsInformation,
    loanInformation,
    LoanDates
}