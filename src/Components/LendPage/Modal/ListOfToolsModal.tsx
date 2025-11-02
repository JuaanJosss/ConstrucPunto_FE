import { formatCurrency } from '@/helpers/formatters'
import type { EquipmentTypeToListType } from '@/Types/EquipmentTypes'

export default function TableProductsLean({ toolsList }: { toolsList: EquipmentTypeToListType[] }) {
    return (
        <div className="border-2 p-1">
            <ul className="grid grid-cols-4 place-items-center w-full font-semibold border-b ">
                <li>Nombre</li>
                <li>Cantidad</li>
                <li>Valor Unidad</li>
                <li>Valor Día</li>
            </ul>

            <div className="w-full max-h-24 overflow-y-auto">
                {toolsList.map((tool, i) => (
                    <ul
                        key={i}
                        className="grid grid-cols-4 place-items-center w-full border-b border-gray-200 p-1"
                    >
                        <li>{tool.name}</li>
                        <li>{tool.quantity}</li>
                        <li>{formatCurrency(tool.unitPrice)}</li>
                        <li>{formatCurrency(tool.quantity * tool.unitPrice)}</li>
                    </ul>
                ))}
            </div>
        </div>
    )
}
