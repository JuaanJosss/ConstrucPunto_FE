type MessageProps = {
    message: string;
}

export default function ErrorMessage({ message }: MessageProps) {
    return (
        <span className="text-red-600 text-sm font-semibold relative w-max select-none">{message}</span>
    )
}