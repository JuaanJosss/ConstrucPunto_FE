interface BoxProps {
    height?: string;
    children: React.ReactNode;
    padding?: string;
    classes?: string
}

export default function BoxContainer({ height, children, padding = 'p-2', classes }: BoxProps) {
    return (
        <div className={`bg-white ${height} shadow-lg mb-3 ${padding} rounded-md ${classes}`}>
            {children}
        </div>
    )
}
