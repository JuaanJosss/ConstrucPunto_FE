import Aside from "@/Components/Aside/Aside";
import { Outlet } from "react-router";

export default function Dashboard() {
    return (
        <main className="bg-accent-bg flex">
            <Aside />
            <div className="w-[80%] mx-3 mt-2">
                <Outlet />
            </div>
        </main>
    )
}
