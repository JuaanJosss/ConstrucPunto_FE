import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
import { CustomFormField } from "../Shared/CustomInputs"
import CustomButton from "../Shared/CustomButton"
import type { LoanByIdType } from "@/Types/LoanTypes"
import type { INoReturnedFieldForm } from "@/Types/FormType"
import { numberPatternValidator } from "@/validations/validation"


type Props = {
    maxReturn: number;
    loan: LoanByIdType | undefined;

    handlerSubmit: (data: INoReturnedFieldForm) => void;
    onChangeSelect: (id: string) => void;
    validateExist: (id: string) => boolean

    register: UseFormRegister<INoReturnedFieldForm>;
    errors: FieldErrors<INoReturnedFieldForm>;
    handleSubmit: UseFormHandleSubmit<INoReturnedFieldForm>;

}

export default function FormNoReturned({ loan, errors, handleSubmit, handlerSubmit, maxReturn, onChangeSelect, register, validateExist }: Props) {
    return (
        <form onSubmit={handleSubmit(handlerSubmit)} className='w-9/12'>
            <legend className='border-2 border-green-800 p-20 rounded-md flex flex-col gap-5'>
                <div className="flex flex-col gap-2">
                    <label htmlFor="none">Seleccione un equipo</label>
                    <select id="none" className="border-2 p-1 rounded-xl" {...register('equipment', { required: true, onChange: (e) => onChangeSelect(e.target.value) })}>
                        {loan?.loanEquipments.map((e, i) => (
                            <option key={i} value={e[5]} disabled={validateExist(e[5])} >{e[1]} - Prestó: {e[0]}</option>
                        ))}
                        <option disabled={true} value='none'>No hay más equipos</option>
                    </select>
                </div>
                <CustomFormField.Input id="equipment" label={`Cantidad que no retornó`} type="text"
                    {...register('quantityNoReturned', {
                        pattern: numberPatternValidator,
                        max: { value: maxReturn, message: `No se puede exceder el limite: ${maxReturn}` },
                        validate: (e) => e.trim() !== '' || 'Este campo no puede ser vacío'
                    })} error={errors.quantityNoReturned} />
                <CustomButton type='submit' classAdd='bg-blue-500 text-white hover:bg-blue-800 w-full mx-auto'>Agregar</CustomButton>
            </legend>
        </form>
    )
}