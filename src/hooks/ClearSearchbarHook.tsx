import type { ISearchByNameOrDocument } from "@/Types/FormType";
import React, { useState } from "react";
import { useForm, type UseFormReset } from "react-hook-form";

type Props<T> = {
    setArrayValue: React.Dispatch<React.SetStateAction<T[]>>;
    func: () => Promise<T[]>;
    reset?: UseFormReset<any>;
}

export default function useClearSearchbarHook<T>({ setArrayValue, func, reset }: Props<T>) {
    const [isFilteredActive, setIsFilteredActive] = useState<boolean>(false);
    const [filter, setFilter] = useState<Record<string, string> | null>(null);
    const { register, handleSubmit, formState: { errors }, reset: resetUseForm } = useForm<ISearchByNameOrDocument>({ defaultValues: { value: "" } });

    const toggleButton = async () => {
        if (reset)
            reset();
        else
            resetUseForm();

        setFilter(null)
        setIsFilteredActive(!isFilteredActive);
        await func().then(setArrayValue)
    }

    return {
        register,
        handleSubmit,
        errors,
        filter,
        setFilter,
        isFilteredActive,
        setIsFilteredActive,
        toggleButton
    }
}