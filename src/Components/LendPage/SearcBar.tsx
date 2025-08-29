import { Search } from 'lucide-react';
import { CustomFormField } from '@/Components/Shared/CustomInputs'
import CustomButton from "@/Components/Shared/CustomButton";


export default function SearcBar() {
    return (
        <div className="bg-white p-5 rounded-xl shadow-lg mb-5 flex items-center gap-5">
            <CustomFormField.Input id="search" label="Buscador" type="text" classAdd="w-9/12 @3xl:w-12/12" />
            <CustomButton
                type="button"
                classAdd="w-3/12 relative top-[13px] bg-gray-200 hover:bg-gray-300 transition-colors duration-300">
                <Search /> Buscar
            </CustomButton>
        </div>
    )
}
