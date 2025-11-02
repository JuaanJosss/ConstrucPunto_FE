import type { LoanType } from "@/Types/LoanTypes"
import Paragraph from "./Paragraph"
import CustomButton from "./CustomButton"

interface PreviewProps {
    data: LoanType[]
    getPromissoryById: (id: LoanType['promissoryNoteId']) => void
}

export default function PreviewLoans({ data, getPromissoryById }: PreviewProps) {

    return (
        <div className="overflow-y-scroll h-[calc(100vh-220px)]">
            {data.map((pre, i) => (
                <div key={i} className={`flex justify-between items-center py-2 px-4 ${i % 2 === 0 ? 'bg-gray-100' : ''}`}>
                    <div>
                        <div className="space-x-6 border-gray-400 flex flex-col">
                            <span className="text-2xl">{pre.clientName}</span>
                            <Paragraph section="Documento" text={pre.cedula} />
                            <Paragraph section="Fecha de inicio" text={pre.deliveryDate} />
                        </div>

                        <div>
                            <h4 className="text-gray-400">Equipos Prestados</h4>
                            <div className="ml-4">
                                {pre.equipmentName.slice(0, 2).map((e, i) => (
                                    <span key={i} className="flex items-center">{e}</span>
                                ))}

                                {pre.equipmentName.length > 2 && (
                                    <span className="flex items-center text-gray-500">+Equipos</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <CustomButton
                        type="button"
                        onClick={() => getPromissoryById(pre.promissoryNoteId)}
                        classAdd="bg-blue-500 hover:bg-blue-700 text-white">Ver detalle</CustomButton>
                </div>
            ))}
        </div>
    )
}
