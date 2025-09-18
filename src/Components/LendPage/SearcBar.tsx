import { Search } from 'lucide-react';
import { CustomFormField } from '@/Components/Shared/CustomInputs'
import CustomButton from "@/Components/Shared/CustomButton";
import { type FieldError, type UseFormHandleSubmit } from 'react-hook-form';


interface SearchBarProps {
    handleSubmit: UseFormHandleSubmit<any>;
    handlerSubmit: (data: any) => void;
    error?: FieldError,
    label?: string;
    children?: React.ReactNode
}


export default function SearcBar({ label = 'Buscador', handleSubmit, handlerSubmit, error, children, ...props }: SearchBarProps) {

    return (
        <form onSubmit={handleSubmit(handlerSubmit)} className="flex items-center gap-5">
            <CustomFormField.Input id="search" label={label} type="text" {...props} error={error} classAdd="w-9/12 @3xl:w-12/12" />
            {children}
            <CustomButton
                type="submit"
                classAdd="w-3/12 relative top-[13px] bg-gray-200 hover:bg-gray-300 transition-colors duration-300">
                <Search /> Buscar
            </CustomButton>
        </form>
    )
}
