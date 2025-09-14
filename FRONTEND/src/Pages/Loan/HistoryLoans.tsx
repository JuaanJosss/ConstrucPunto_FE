import { CustomFormField } from "@/Components/Shared/CustomInputs";
import { getLoanPerDocumentOrDate, getLoans } from "@/Services/LoanService";
import { Modal } from "@/Components/Shared/Modal";
import { numberPattern } from "@/Patterns/formsPatterns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BoxContainer from "@/Components/Shared/BoxContainer";
import CustomButton from "@/Components/Shared/CustomButton";
import FilterInfo from "./FilterInfo";
import ModalContentDetailLoan from "@/Components/ActiveLoans/ModalContentInvoice";
import Paragraph from "@/Components/Shared/Paragraph";
import SearcBar from "@/Components/LendPage/SearcBar";
import type { ILoanSearchType } from "@/Types/FormType";
import type { LoanType } from "@/Types/LoanTypes";
import useClearSearchbarHook from "@/hooks/ClearSearchbarHook";

export default function HistoryLoans() {
    const [data, setData] = useState<LoanType[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [promiId, setPromiId] = useState<number | null>(null)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ILoanSearchType>({ defaultValues: { document: '', date: '' } })
    const { isFilteredActive, toggleButton, setIsFilteredActive, filter, setFilter } = useClearSearchbarHook({ func: () => getLoans(false), setArrayValue: setData, reset: reset });

    useEffect(() => {
        getLoans(false).then(setData);
    }, [])


    const getPromissoryId = (id: number) => {
        setPromiId(id);
        switchModal();
    }

    const switchModal = (): void => {
        setIsOpen(!isOpen);
    }

    const handlerFilter = async (data: ILoanSearchType) => {
        if (!data.date && !data.document) {
            return;
        }

        const record: Record<number, string> = { 0: data.date, 1: data.document };
        setFilter(record);

        await getLoanPerDocumentOrDate(data, false).then(setData);
        setIsFilteredActive(true);
    }


    return (
        <>
            <BoxContainer>
                <SearcBar
                    handleSubmit={handleSubmit}
                    handlerSubmit={handlerFilter}
                    error={errors.document}
                    {...register('document', { pattern: { value: numberPattern.reGex, message: numberPattern.message } })}
                    label="Busca por cédula" >
                    <CustomFormField.Input id="date" label="Fecha" type="date" {...register('date')} />
                </SearcBar>
            </BoxContainer>
            <BoxContainer>
                <div className="flex justify-between">
                    {filter && <FilterInfo fecha={filter[0]} document={filter[1]} />}
                    {isFilteredActive && <CustomButton onClick={toggleButton} type="button" classAdd="bg-gray-200 hover:bg-gray-300"> Borrar filtro  </CustomButton>}
                </div>
                <h1 className="text-2xl font-semibold text-center p-2">{data.length < 1 ? 'No hay historial' : 'Historial de préstamos'}</h1>
                <div className="overflow-y-scroll h-[calc(100vh-220px)]">
                    {data?.map((pre, i) => (
                        <div key={i} className={`flex justify-between items-center py-2 px-4 ${i % 2 === 0 ? 'bg-gray-100' : ''}`}>
                            <div>
                                <div className="space-x-6 border-gray-400 flex flex-col">
                                    <span className="text-2xl">{pre.clientName}</span>
                                    <Paragraph section="Documento" text={pre.cedula} />
                                    <Paragraph section="Fecha" text={pre.date} />
                                </div>

                                <div>
                                    <h4 className="text-gray-400">Equipos Prestados</h4>
                                    <div className="ml-4">
                                        {pre.equipmentName.map((e, i) => (
                                            <span key={i} className="flex items-center">{e}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <CustomButton
                                type="button"
                                onClick={() => getPromissoryId(pre.promissoryNoteId)}
                                classAdd="bg-blue-500 hover:bg-blue-700 text-white">Ver detalle</CustomButton>
                        </div>
                    ))}
                </div>
            </BoxContainer>
            <Modal isOpen={isOpen} onClose={switchModal} title="Detalle">
                {promiId && <ModalContentDetailLoan promissoryId={promiId} />}
            </Modal>
        </>
    )
}
