import type { FieldError } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

type inputProps = {
    label: string;
    id: string;
    type?: string;
    error?: FieldError;
    classAdd?: string;
}



export function Input({ label, id, type = 'text', classAdd = '', error, ...props }: inputProps) {

    const communClass = `py-1 pl-2 border-2 placeholder:text-accent-color border-accesible-color-two-dark focus:border-accent-color outline-none rounded-sm ${error ? 'border-red-500' : ''}`

    return (
        <>
            <div className={`flex flex-col gap-1 ${classAdd} text-accent-color`}>
                <label htmlFor={id}>{label}</label>
                <input
                    id={id}
                    className={`${communClass}`}
                    {...props}
                    type={type}
                    placeholder={label} />
                {error && <ErrorMessage message={error.message!} />}
            </div>
        </>
    )
}


export const CustomFormField = {
    Input
}
