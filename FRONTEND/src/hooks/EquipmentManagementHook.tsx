import { deleteEquipment, getEquipment } from "@/Services/EquipmentService";
import type { EquipmentType } from "@/Types/EquipmentTypes";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useClearSearchbarHook from "./ClearSearchbarHook";
import type { IFindEquipmentByName } from "@/Types/FormType";
import { useForm } from "react-hook-form";

export default function useEquipmentManagementHook() {
    const [equipments, setEquipments] = useState<EquipmentType[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [toolId, setToolId] = useState<number | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFindEquipmentByName>({ defaultValues: { equipment: '' } })

    const { toggleButton, isFilteredActive, setIsFilteredActive } = useClearSearchbarHook({ setArrayValue: setEquipments, func: getEquipment, reset })

    useEffect(() => {
        getEquipment().then(setEquipments);
    }, []);

    const removeTool = (id: number) => {
        setToolId(id);
        setOpenModal(true);
    }

    const onConfirm = async () => {
        if (toolId === null) return;
        await deleteEquipment(toolId);
        await getEquipment().then(setEquipments);
        setOpenModal(false);
        toast.success('Se eliminó correctamente');
    }

    const onCancel = () => {
        setOpenModal(false)
    }

    return {
        equipments,
        setEquipments,
        openModal,
        removeTool,

        toggleButton,
        isFilteredActive,
        setIsFilteredActive,


        onConfirm,
        onCancel,
        handleSubmit,
        register,
        errors,
        reset
    }
}
