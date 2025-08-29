import { Link } from "react-router";
import { Clipboard, Plus } from "lucide-react";
import { ButtonContent } from "./ButtonContent";
import { routes } from "@/Router/routes";
import useAsideHook from "@/hooks/AsideHook";
import type { ILinks } from "@/Types/Types";


export default function Aside() {
    const { clientOptions, lendingOptions, SwitchClientOptions, SwitchLendingOptions } = useAsideHook()

    const Links: ILinks[] = [
        {
            links: [`${routes.FORMS}/${routes.REGISTER_CLIENT}`, `${routes.VIEW_LENDS}`, `${routes.VIEW_LENDS}`],
            text: ["hacer prestamo", "prestamos activos", "Historial de prestamos"],
            icons: [<Plus />, <Clipboard />]
        },
        {
            links: [`${routes.FORMS}/${routes.REGISTER_CLIENT}`],
            text: ["registar cliente",],
            icons: [<Plus />]
        }
    ]


    return (
        <aside className="h-screen bg-white w-[270px]">
            <div>
                <div className="flex justify-center my-4">
                    <Link to={routes.HOME} className="text-xl font-semibold mt-4"><img src="../logo.jpg" alt="" /></Link>
                    {/* mix-blend-color-burn */}
                </div>
                <ButtonContent
                    onClick={SwitchLendingOptions}
                    isOpen={lendingOptions}
                    sectionName={"Gestionar Prestamos"}
                    links={Links[0]} />
                <ButtonContent
                    onClick={SwitchClientOptions}
                    isOpen={clientOptions}
                    sectionName={"Gestionar Clientes"}
                    links={Links[1]} />
            </div>
        </aside>
    )
}



