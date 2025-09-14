import { toastMessages } from "@/helpers/toastMessages";
import { routes } from "@/Router/routes";
import { getEquipment } from "@/Services/EquipmentService";
import { createLoan } from "@/Services/LoanService";
import { useClientStore } from "@/Store/Client/ClientStore";
import { useEquipmentsStore } from "@/Store/Equipment/EquipmentStore";
import type { EquipmentType } from "@/Types/EquipmentTypes";
import type { LoanFormType } from "@/Types/LoanTypes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/shallow";

interface FormValue {
    name: string;
}


export default function useLendingPageHook() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [equipments, setEquipment] = useState<EquipmentType[]>([]);

    const setTools = useEquipmentsStore(useShallow(state => state.setTools));
    const toolsList = useEquipmentsStore(useShallow(state => state.ToolsToList));
    const client = useClientStore(useShallow((state => state.client)))

    const { register, handleSubmit, formState: { errors } } = useForm<FormValue>({ defaultValues: { name: '' } })

    const switchOpen = (): void => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        getEquipment().then(setEquipment);
    }, [setEquipment])


    useEffect(() => {
        if (!client)
            navigate(`/${routes.FORMS}/${routes.CLIENT.FIND}`, { replace: true });
    }, [client, navigate]);


    useEffect(() => {
        setTools(equipments);
    }, [equipments, setTools])


    const handlerSubmit = async (data: LoanFormType) => {

        await createLoan(data);
        setIsOpen(false);
        navigate(`/${routes.LEND.VIEW_ACTIVE_COMPLETED}`, { replace: true });
        toast.success(`¡El pagaré ${toastMessages.createdSuccess}`);
    }

    const handlerSearchbar = async (data: FormValue) => {


    }



    return {
        toolsList,
        client,
        isOpen,
        equipments,

        //? modal
        switchOpen,
        handlerSubmit,

        //? SerachBar
        register,
        handleSubmit,
        errors,
        handlerSearchbar

    }
}
