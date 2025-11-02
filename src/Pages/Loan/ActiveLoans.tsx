import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { toastMessages } from "@/helpers/toastMessages";
import { Modal } from "@/Components/Shared/Modal";
import { CustomFormField } from "@/Components/Shared/CustomInputs";
import BoxContainer from "@/Components/Shared/BoxContainer";
import CustomButton from "@/Components/Shared/CustomButton";
import SearcBar from "@/Components/LendPage/SearcBar";
import ModalContentDetailLoan from "@/Components/ActiveLoans/ModalContentInvoice";
import PreviewLoans from "@/Components/Shared/PreviewLoans";
import ModalHooks from "@/hooks/ModalHooks";
import { createInvoice, getLoanPerDocumentOrDate, getLoans } from "@/Services/LoanService";
import FilterInfo from "./FilterInfo";
import type { ILoanSearchType, IReturnFieldDate } from "@/Types/FormType";
import type { LoanType } from "@/Types/LoanTypes";
import useClearSearchbarHook from "@/hooks/ClearSearchbarHook";
import { numberPatternValidator } from "@/validations/validation";
import GetLoansHook from "@/hooks/Loan.tsx/getLoans";

export default function ViewActivedLoans() {
    const { data, setData } = GetLoansHook()
    const [promiId, setPromiId] = useState<LoanType['promissoryNoteId'] | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ILoanSearchType>({ defaultValues: { document: '', date: '' } })
    const { register: registerReturn, handleSubmit: handlerSubmitReturn, formState: { errors: errorReturn }, getValues } = useForm<IReturnFieldDate>({ defaultValues: { date: '' } })
    const { isOpen, switchModal } = ModalHooks();
    const { isFilteredActive, toggleButton, setIsFilteredActive, filter, setFilter } = useClearSearchbarHook({ func: () => getLoans(true), setArrayValue: setData, reset: reset });


    const getPromissoryId = (id: LoanType['promissoryNoteId']) => {
        setPromiId(id);
        switchModal();
    }

    const handlerButton = async (data: IReturnFieldDate) => {
        await createInvoice(promiId!, data.date);
        await getLoans(true).then(setData);
        switchModal();
        toast.success(`¡La factura del pagaré ${promiId} ${toastMessages.createdSuccess}`)
    }


    const handlerFilter = async (data: ILoanSearchType) => {
        if (!data.date && !data.document) {
            return;
        }
        const record: Record<number, string> = { 0: data.date, 1: data.document };
        setFilter(record);
        await getLoanPerDocumentOrDate(data, true).then(setData);

        setIsFilteredActive(true);
    }

    return (
        <>
            <BoxContainer >
                <SearcBar
                    handleSubmit={handleSubmit}
                    handlerSubmit={handlerFilter}
                    error={errors.document}
                    {...register('document', { pattern: numberPatternValidator })}
                    label="Busca por cédula" >
                    <CustomFormField.InputDate id="date" label="Fecha" type="date" {...register('date')} />
                </SearcBar>
            </BoxContainer>
            <BoxContainer>
                <div className="flex justify-between">
                    {filter && <FilterInfo fecha={filter[0]} document={filter[1]} />}
                    {isFilteredActive && <CustomButton onClick={toggleButton} type="button" classAdd="justify-self-start bg-gray-200 hover:bg-gray-300">    Borrar filtro</CustomButton>}
                </div>
                <h1 className="text-2xl relative font-semibold text-center p-2 col-start-2 ">{data.length < 1 ? 'No hay préstamos activos' : 'Préstamos Activos'}</h1>
                {data && <PreviewLoans data={data} getPromissoryById={getPromissoryId} />}
            </BoxContainer >


            <Modal isOpen={isOpen} onClose={switchModal} title="Detalle">
                {promiId && <ModalContentDetailLoan
                    promissoryId={promiId}
                    onCloser={handlerSubmitReturn(handlerButton)}
                    error={errorReturn}
                    register={registerReturn}
                    getValues={getValues} />}
            </Modal>
        </>
    )
}
