import { routes } from '@/Router/routes';
import type { EquipmentType } from '@/Types/EquipmentTypes';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { CustomFormField } from '../Shared/CustomInputs';
import CustomButton from '../Shared/CustomButton';
import { ArrowLeft } from 'lucide-react';
import { minValidator, numberPatternValidator, requiredValidator } from '@/validations/validation';

export default function Form({ handlerSubmit, e }: { handlerSubmit: (equipment: EquipmentType) => Promise<void>, e?: EquipmentType }) {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, watch } = useForm<EquipmentType>({
        defaultValues: {
            id: e?.id && e.id,
            name: e?.name ? e.name : '',
            description: e?.description ? e.description : '',
            unitPrice: e?.unitPrice ? e.unitPrice : 0,
            quantity: e?.quantity ? e.quantity : 0,
            total: e?.total ? e.total : 0,
        }
    });
    const totalStock = watch('total');
    function returnToManagenemt() {
        navigate(`/${routes.EQUIPMENT.EQUIPMENT_MANAGEMENT}`);
    }

    return (
        <>
            <CustomButton type='button' classAdd='bg-blue-300 hover:bg-blue-400 text-white' onClick={returnToManagenemt}> <ArrowLeft /> Volver</CustomButton>
            <div className='flex justify-center flex-col gap-4 items-center'>
                <h1 className='text-2xl font-semibold'> {e ? 'Editar Equipo' : 'Agregar equipo'}</h1>
                <form onSubmit={handleSubmit(handlerSubmit)} className=' w-6/12'>
                    <legend className='border-2 border-green-800 p-7 rounded-md flex flex-col gap-5'>
                        <CustomFormField.Input
                            label='Nombre'
                            id='name'
                            {...register('name', { required: requiredValidator })}
                            error={errors.name} />
                        <CustomFormField.Input
                            label='Valor unitario'
                            id='address'
                            {...register('unitPrice', {
                                required: requiredValidator,
                                pattern: numberPatternValidator,
                                min: minValidator
                            })}
                            error={errors.unitPrice} />
                        <CustomFormField.Input
                            label='Total en Inventario'
                            id='number-phone'
                            {...register('total', {
                                required: requiredValidator,
                                pattern: numberPatternValidator,
                                min: minValidator
                            })}
                            error={errors.total} />
                        <CustomFormField.Input
                            label='Cantidad disponible'
                            id='quantity'
                            {...register('quantity', {
                                required: requiredValidator,
                                pattern: numberPatternValidator,
                                min: minValidator,
                                max: { value: totalStock, message: 'Debe de ser menor o igual a total en inventario' }
                            })}
                            error={errors.quantity} />
                        <CustomFormField.Input
                            label='Descripción'
                            id='address'
                            {...register('description', {
                                required: requiredValidator
                            })}
                            error={errors.description} />
                        <CustomButton type='submit' classAdd='bg-green-500 text-white hover:bg-green-600 w-6/12 mx-auto'>Guardar</CustomButton>
                    </legend>
                </form>
            </div>
        </>
    )
}
