import type { ClientType } from "@/Types/ClientTypes";
import { Pencil, Trash } from "lucide-react";
import { NavLink } from "react-router";
import CustomButton from "../Shared/CustomButton";
import { routes } from "@/Router/routes";

export default function ClientList({ clients, removeClient }: { clients: ClientType[], removeClient: (id: number) => void }) {
    return (
        <div className="h-10/12 overflow-y-scroll">
            {clients.map((client, i) => (
                <ul key={i} className={`grid grid-cols-5 place-items-center p-2 ${i % 2 === 0 ? 'bg-gray-100' : ''}`}>
                    <li>{client.cedula}</li>
                    <li>{client.name}</li>
                    <li>{client.numberPhone}</li>
                    <li>{client.address}</li>
                    <li className="flex gap-2">
                        <NavLink to={`/${routes.FORMS}/${routes.CLIENT.EDIT}/${client.cedula}`} className={'bg-blue-400 hover:bg-blue-700 text-white flex p-2 rounded-md transition-colors duration-200'}> <Pencil /> </NavLink>
                        <CustomButton type="button" onClick={() => removeClient(client.id as number)} classAdd="bg-red-500 hover:bg-red-700"> <Trash className="text-white" /> </CustomButton>
                    </li>
                </ul>
            ))}
        </div>
    )
}
