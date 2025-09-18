export function Column({ children, color }: { children: React.ReactNode, color: "bg-gray-100" | "bg-white" }) {
    return (
        <div className={`p-3 ${color} flex justify-between items-center`}>{children}</div>
    )
}

export function Name({ name }: { name: string }) {
    return <h1 className="text-2xl font-semibold">{name} </h1>
}

export function Disponibility({ dispo }: { dispo: number }) {
    return <p className="text-gray-500">Disponibilidad: <span className="text-black"> {dispo} </span> </p>
}

export function UnitPrice({ price }: { price: number | string }) {
    return <p className="text-gray-500">Precio unidad: <span className="text-black"> {price} </span> </p>
}

export function Code({ code }: { code: number }) {
    return <p className="text-gray-500">Código: <span className="text-black"> {code} </span> </p>
}

export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}

export function TotalStock({ total }: { total: number }) {

    return (<p className="text-gray-500">Total en almacen: <span className="text-black"> {total} </span> </p>)
}


export function ContainerForOptions() {
    return <div className="flex justify-between"></div>
}


export function Description({ description }: { description: string }) {
    return <p className="text-gray-600 flex flex-col">Descripción: <span className="mx-4 text-black capitalize">{description}</span> </p>
}

export const ToolsColumn = {
    Code,
    Column,
    Container,
    ContainerForOptions,
    Description,
    Disponibility,
    Name,
    TotalStock,
    UnitPrice
}
