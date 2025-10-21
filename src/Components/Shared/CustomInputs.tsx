import type { FieldError } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

type inputProps = {
    label: string;
    id: string;
    type?: string;
    error?: FieldError;
    classAdd?: string;
}

const communClass = `py-1 pl-2 border-2 placeholder:text-accent-color border-accesible-color-two-dark focus:border-accent-color outline-none rounded-sm text-accent-color`

export function Input({ label, id, type = 'text', classAdd = '', error, ...props }: inputProps) {
    return (
        <>
            <div className={`flex flex-col gap-1 ${classAdd}`}>
                <label htmlFor={id}>{label}</label>
                <input
                    id={id}
                    className={`${communClass} ${error ? 'border-red-500' : ''}`}
                    {...props}
                    type={type}
                    placeholder={label} />
                {error && <ErrorMessage message={error.message!} />}
            </div>
        </>
    )
}


export function InputDate({ label, id, type = 'text', classAdd = '', error, ...props }: inputProps) {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    const minDate = today.toISOString().split("T")[0];

    return (
        <>
            <div className={`flex flex-col gap-1 ${classAdd} text-accent-color`}>
                <label htmlFor={id}>{label}</label>
                <input
                    id={id}
                    className={`${communClass} ${error ? 'border-red-500' : ''}`}
                    {...props}
                    type={type}
                    min={minDate}
                    placeholder={label} />
                {error && <ErrorMessage message={error.message!} />}
            </div>
        </>
    )

}


export const CustomFormField = {
    Input,
    InputDate
}
