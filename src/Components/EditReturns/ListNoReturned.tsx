import type { EquipsEdited } from "@/Types/EquipmentTypes"
import Paragraph from "../Shared/Paragraph"

type Props = {
    noReturnedList: EquipsEdited[]
}

export default function NoReturnedList({ noReturnedList }: Props) {
    return (
        <div className="space-y-2.5">
            {noReturnedList.map((e, i) => (
                <div key={i} className="border-b border-black">
                    <Paragraph section={'Nombre'} text={e.name} />
                    <Paragraph section={'No retornó'} text={e.returns} />
                </div>
            ))}
        </div>
    )
}
