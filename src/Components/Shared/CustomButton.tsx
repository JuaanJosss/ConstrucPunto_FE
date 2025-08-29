type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    type: 'button' | 'submit';
    classAdd?: string;
    paddingClass?: string
    disabled?: boolean
    id?: string;
}

export default function CustomButton({ children, type, onClick, classAdd, paddingClass = "px-4 py-2", disabled, id }: ButtonProps) {
    const communClass = `flex gap-2 ${paddingClass} rounded-lg justify-center items-center transition-colors duration-300 hover:cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed ${classAdd}`;

    return (
        <button
            id={id}
            type={type}
            onClick={onClick}
            className={`${communClass}`}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
