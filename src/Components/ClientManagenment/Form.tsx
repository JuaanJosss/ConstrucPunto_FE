import CustomButton from '@/Components/Shared/CustomButton'
import { CustomFormField } from '@/Components/Shared/CustomInputs'
import { routes } from '@/Router/routes';
import { useClientStore } from '@/Store/Client/ClientStore';
import type { ClientType } from '@/Types/ClientTypes';
import { addressPatternValidator, numberPatternValidator, requiredValidator } from '@/validations/validation';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useShallow } from 'zustand/shallow';

export default function Form({ handlerSubmit, client }: { handlerSubmit: (client: ClientType) => Promise<void>, client?: ClientType }) {
    const navigate = useNavigate()
    const document = useClientStore(useShallow(s => s.documentoToRegister))

    const { register, handleSubmit, formState: { errors } } = useForm<ClientType>({
        defaultValues: {
            id: client && client.id,
            cedula: client ? client.cedula : document ? document : '',
            name: client ? client.name : '',
            address: client ? client.address : '',
            numberPhone: client ? client.numberPhone : ''
        }
    });

    function returnToManagenemt() {
        navigate(`/${routes.CLIENT.CLIENT_MANAGEMENT}`)
    }

    return (
        <>
            <CustomButton type='button' classAdd='bg-blue-300 hover:bg-blue-400 text-white' onClick={returnToManagenemt}> <ArrowLeft /> Volver</CustomButton>
            <div className='flex justify-center flex-col gap-4 items-center h-full'>
                <h1 className='text-2xl font-semibold'>{client ? 'Editar cliente' : 'Agregar cliente'}</h1>
                <form onSubmit={handleSubmit(handlerSubmit)} className='w-6/12'>
                    <legend className='border-2 border-green-800 p-10 rounded-md flex flex-col gap-5'>
                        <CustomFormField.Input
                            label='Cédula'
                            id='document'
                            {...register('cedula', {
                                required: requiredValidator,
                                pattern: numberPatternValidator
                            })}
                            error={errors.cedula} />
                        <CustomFormField.Input
                            label='Nombre completo'
                            id='name'
                            {...register('name', { required: requiredValidator })}
                            error={errors.name} />
                        <CustomFormField.Input
                            label='Dirección'
                            id='address'
                            {...register('address', {
                                required: requiredValidator,
                                pattern: addressPatternValidator
                            })}
                            error={errors.address} />
                        <CustomFormField.Input
                            label='Número de teléfono'
                            id='number-phone'
                            {...register('numberPhone', {
                                required: requiredValidator,
                                pattern: numberPatternValidator
                            })}
                            error={errors.numberPhone} />
                        <CustomButton type='submit' classAdd='bg-green-500 text-white hover:bg-green-600 w-6/12 mx-auto'>Guardar</CustomButton>
                    </legend>
                </form>
            </div>

        </>

    )
}
