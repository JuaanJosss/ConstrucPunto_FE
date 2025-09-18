import Aside from "@/Components/Aside/Aside";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";

export default function Dashboard() {
    return (
        <main className=" bg-gradient-to-b from-accent-bg to-green-100 flex">
            <Aside />
            <div className="w-full mx-3 mt-2">
                <Outlet />
            </div>
            <Toaster />
        </main>
    )
}
