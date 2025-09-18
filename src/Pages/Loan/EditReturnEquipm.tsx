import FormNoReturned from "@/Components/EditReturns/FormNoReturned";
import NoReturnedList from "@/Components/EditReturns/ListNoReturned";
import BoxContainer from "@/Components/Shared/BoxContainer";
import CustomButton from "@/Components/Shared/CustomButton";
import EditReturnEquipmHook from "@/hooks/EditReturnEquipmHook";
import { ArrowLeft } from "lucide-react";

export default function EditReturnEquipm() {
    const {
        noReturnedList, loan, maxReturn,
        handlerButton, returnToManagenemt, validateExist,
        errors, handleSubmit, handlerSubmit, onChangeSelect, register } = EditReturnEquipmHook()

    const formNoReturnedProps = { errors, handleSubmit, handlerSubmit, maxReturn, onChangeSelect, register, validateExist, loan }

    if (loan)
        return (
            <>
                <CustomButton
                    type='button'
                    classAdd='bg-blue-300 hover:bg-blue-400 text-white'
                    onClick={returnToManagenemt}> <ArrowLeft /> Volver</CustomButton>
                <div className="w-full flex gap-4 mt-2">
                    <BoxContainer classes="h-[calc(100vh-80px)] w-8/12 flex flex-col justify-center items-center">
                        <h1 className='text-2xl font-semibold text-center mb-4'> Edición de equipos retornados</h1>
                        <div className="flex justify-around gap-10 items-center w-full">
                            <FormNoReturned {...formNoReturnedProps} />
                        </div>
                    </BoxContainer>
                    <div className="p-4 rounded-lg  flex flex-col justify-between gap-2">
                        <h3 className="text-2xl my-2">No retornados</h3>
                        <BoxContainer classes="h-full overflow-y-scroll" padding="p-4">
                            {noReturnedList && <NoReturnedList noReturnedList={noReturnedList} />}
                        </BoxContainer>
                        <CustomButton
                            type="button" onClick={handlerButton}
                            classAdd="bg-green-500 hover:bg-green-600 text-green-600 text-white disabled:text-blue-600 w-full"
                            disabled={noReturnedList?.length! < 1}>
                            Generar factura y nuevo pagaré
                        </CustomButton>
                    </div>
                </div>
            </>
        )
}