import { toastMessages } from "@/helpers/toastMessages";
import { routes } from "@/Router/routes";
import { getEquipment } from "@/Services/EquipmentService";
import { createLoan } from "@/Services/LoanService";
import { useClientStore } from "@/Store/Client/ClientStore";
import { useEquipmentsStore } from "@/Store/Equipment/EquipmentStore";
import type { EquipmentType } from "@/Types/EquipmentTypes";
import type { IFindEquipmentByName } from "@/Types/FormType";
import type { LoanFormType } from "@/Types/LoanTypes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/shallow";
import useClearSearchbarHook from "./ClearSearchbarHook";
import ModalHooks from "./ModalHooks";

export default function useLendingPageHook() {
    const navigate = useNavigate()
    const [equipments, setEquipment] = useState<EquipmentType[]>([]);

    const setTools = useEquipmentsStore(useShallow(state => state.setTools));
    const toolsList = useEquipmentsStore(useShallow(state => state.ToolsToList));
    const clearList = useEquipmentsStore(useShallow(state => state.clearList));
    const client = useClientStore(useShallow((state => state.client)))
    const setClient = useClientStore(useShallow((state => state.setCLient)))

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFindEquipmentByName>({ defaultValues: { equipment: '' } })
    const { toggleButton, isFilteredActive, setIsFilteredActive } = useClearSearchbarHook({ setArrayValue: setEquipment, func: getEquipment, reset })
    const { isOpen, switchModal } = ModalHooks()


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
        const response = await createLoan(data);
        if (response === 200 || response === 201) {
            toast.success(`¡El pagaré ${toastMessages.createdSuccess}`);
            navigate(`/${routes.LEND.VIEW_ACTIVE_COMPLETED}`, { replace: true });
            switchModal()
        }
        else {
            toast.error('Revisar los datos')
        }
    }

    const handlerCancelLoan = () => {
        setClient(null)
        clearList();
    }


    return {
        toolsList,
        client,
        isOpen,
        equipments,
        setEquipment,

        //? modal
        switchModal,
        handlerSubmit,

        //? SerachBar
        register,
        handleSubmit,
        errors,

        isFilteredActive,
        setIsFilteredActive,
        toggleButton,
        handlerCancelLoan
    }
}
