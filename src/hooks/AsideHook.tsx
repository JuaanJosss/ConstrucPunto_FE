import { routes } from "@/Router/routes";
import type { ILinks } from "@/Types/Types";
import { Folders, Plus, Clipboard, Wrench } from "lucide-react";
import { useState } from "react";


export default function useAsideHook() {
    const [lendingOptions, setLendingOptions] = useState<boolean>(false);

    function SwitchLendingOptions() {
        setLendingOptions(!lendingOptions);
    }

    const Links: ILinks[] = [
        {
            links: [`${routes.FORMS}/${routes.CLIENT.FIND}`, `${routes.LEND.VIEW_ACTIVE}`, `${routes.LEND.HISTORY}`],
            text: ["Crear", "Activos", "Historial"],
            icons: [<Plus />, <Clipboard />, <Folders />]
        },
        {
            links: [`/${routes.CLIENT.CLIENT_MANAGEMENT}`],
            text: ["Gestionar clientes",],
            icons: [<Clipboard />]
        },
        {
            links: [`/${routes.EQUIPMENT.EQUIPMENT_MANAGEMENT}`],
            text: ["Gestionar equipos",],
            icons: [<Wrench />]
        }
    ]


    return {
        Links,
        lendingOptions,
        SwitchLendingOptions
    }
}
