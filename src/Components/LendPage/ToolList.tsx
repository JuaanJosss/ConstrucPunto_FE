export function Column({ children, color }: { children: React.ReactNode, color: "bg-gray-100" | "bg-white" }) {
    return (
        <div className={`p-3 ${color} flex justify-between items-center`}>{children}</div>
    )
}

export function Name({ name }: { name: string }) {
    return <h1 className="text-2xl font-semibold">{name} </h1>
}

export function Information({ dispo, code }: { dispo: number, code: string }) {
    return (
        <>
            <p className="text-gray-500">Disponibilidad: <span className="text-black"> {dispo} </span> </p>
            <p className="text-gray-500">Código: <span className="text-black"> {code} </span> </p>
        </>
    )
}

export function Container({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}

export const ToolsColumn = {
    Column,
    Container,
    Information,
    Name
}
