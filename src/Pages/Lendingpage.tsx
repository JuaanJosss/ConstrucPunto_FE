import ToolsListAdded from "@/Components/LendPage/ToolsListAdded";
import { useToolsStore } from "@/Store/Tools/ToolsStore";
import { useShallow } from "zustand/shallow";
import ToolsSearched from "@/Components/LendPage/ToolsSearched";
import SearcBar from "@/Components/LendPage/SearcBar";

export default function Lendingpage() {
    const Tools = useToolsStore(useShallow((state => state.Tools)));

    return (
        <div className="flex gap-3 w-12/12 mx-auto">
            <div className="md:w-8/12 @3xl:w-12/12">
                <SearcBar />
                <div className="bg-white md:h-[80vh] @3xl:h-[85vh] overflow-y-scroll rounded-xl shadow-lg">
                    {Tools.map((tool, i) => <ToolsSearched key={i} tool={tool} idx={i} />)}
                </div>
            </div>
            <div className="md:w-4/12 @3xl:w-3/12">
                <ToolsListAdded />
            </div>
        </div>
    )
}


