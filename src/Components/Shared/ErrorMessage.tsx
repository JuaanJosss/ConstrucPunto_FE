type MessageProps = {
    message: string;
}

export default function ErrorMessage({ message }: MessageProps) {
    return (
        <span className="text-red-600 text-sm font-semibold relative text-center mx-auto w-full
        before:content-[''] before:left-0 before:w-full before:h-[2px] before:top-5 before:bg-red-600 before:absolute">{message}</span>
    )
}