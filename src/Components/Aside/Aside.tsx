import { Link } from "react-router";
import { AsideButtons } from "./AsideButtonsCompound";
import { routes } from "@/Router/routes";
import useAsideHook from "@/hooks/AsideHook";


export default function Aside() {
    const { Links } = useAsideHook()

    return (
        <aside className="h-screen bg-white w-[290px] shadow-xl">
            <div>
                <div className="flex justify-center my-4">
                    <Link to={routes.LEND.VIEW_ACTIVE} className="text-xl font-semibold mt-4"><img src="../logo.jpg" alt="" /></Link>
                </div>
                <AsideButtons.ButtonWithSubSections
                    sectionName={"Gestionar Prestamos"}
                    links={Links[0]} />
                <AsideButtons.ButtonSection
                    sectionName={"Gestionar Clientes"}
                    links={Links[1]} />
                <AsideButtons.ButtonSection
                    sectionName={"Gestionar Equipo"}
                    links={Links[2]} />
            </div>
        </aside>
    )
}



