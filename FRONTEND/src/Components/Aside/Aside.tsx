import { Link } from "react-router";
import { ButtonContent } from "./ButtonContent";
import { routes } from "@/Router/routes";
import useAsideHook from "@/hooks/AsideHook";


export default function Aside() {
    const { lendingOptions, SwitchLendingOptions, Links } = useAsideHook()

    return (
        <aside className="h-screen bg-white w-[290px]">
            <div>
                <div className="flex justify-center my-4">
                    <Link to={routes.HOME} className="text-xl font-semibold mt-4"><img src="../logo.jpg" alt="" /></Link>
                </div>
                <ButtonContent
                    onClick={SwitchLendingOptions}
                    isOpen={lendingOptions}
                    sectionName={"Gestionar Prestamos"}
                    links={Links[0]}
                    haveSubsections={true} />
                <ButtonContent
                    sectionName={"Gestionar Clientes"}
                    links={Links[1]} />
                <ButtonContent
                    sectionName={"Gestionar Equipo"}
                    links={Links[2]} />
            </div>
        </aside>
    )
}



