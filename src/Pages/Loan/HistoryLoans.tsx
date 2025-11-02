import { CustomFormField } from "@/Components/Shared/CustomInputs";
import { getLoanPerDocumentOrDate, getLoans } from "@/Services/LoanService";
import { Modal } from "@/Components/Shared/Modal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BoxContainer from "@/Components/Shared/BoxContainer";
import CustomButton from "@/Components/Shared/CustomButton";
import FilterInfo from "./FilterInfo";
import ModalContentDetailLoan from "@/Components/ActiveLoans/ModalContentInvoice";
import SearcBar from "@/Components/LendPage/SearcBar";
import type { ILoanSearchType } from "@/Types/FormType";
import type { LoanType } from "@/Types/LoanTypes";
import useClearSearchbarHook from "@/hooks/ClearSearchbarHook";
import PreviewLoans from "@/Components/Shared/PreviewLoans";
import ModalHooks from "@/hooks/ModalHooks";
import { documentValidator } from "@/validations/validation";

export default function HistoryLoans() {
    const [data, setData] = useState<LoanType[]>([]);
    const [promiId, setPromiId] = useState<number | null>(null)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ILoanSearchType>({ defaultValues: { document: '', date: '' } })
    const { isFilteredActive, toggleButton, setIsFilteredActive, filter, setFilter } = useClearSearchbarHook({ func: () => getLoans(false), setArrayValue: setData, reset: reset });
    const { isOpen, switchModal } = ModalHooks()

    useEffect(() => {
        getLoans(false).then(setData);
    }, [])


    const getPromissoryId = (id: LoanType['promissoryNoteId']) => {
        setPromiId(id);
        switchModal();
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
                    {...register('document', { pattern: documentValidator })}
                    label="Busca por cédula" >
                    <CustomFormField.InputDate id="date" label="Fecha" type="date" {...register('date')} />
                </SearcBar>
            </BoxContainer>

            <BoxContainer>
                <div className="flex justify-between">
                    {filter && <FilterInfo fecha={filter[0]} document={filter[1]} />}
                    {isFilteredActive && <CustomButton onClick={toggleButton} type="button" classAdd="bg-gray-200 hover:bg-gray-300"> Borrar filtro  </CustomButton>}
                </div>
                <h1 className="text-2xl font-semibold text-center p-2">{data.length < 1 ? 'No hay historial' : 'Historial de préstamos'}</h1>
                {data && <PreviewLoans data={data} getPromissoryById={getPromissoryId} />}
            </BoxContainer>
            <Modal isOpen={isOpen} onClose={switchModal} title="Detalle">
                {promiId && <ModalContentDetailLoan promissoryId={promiId} />}
            </Modal>
        </>
    )
}
