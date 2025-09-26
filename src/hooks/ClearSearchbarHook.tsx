import React, { useState } from "react";
import { type UseFormReset } from "react-hook-form";

type Props<T> = {
    setArrayValue: React.Dispatch<React.SetStateAction<T[]>>;
    func: () => Promise<T[]>;
    reset: UseFormReset<any>;
}

export default function useClearSearchbarHook<T>({ setArrayValue, func, reset }: Props<T>) {
    const [isFilteredActive, setIsFilteredActive] = useState<boolean>(false);
    const [filter, setFilter] = useState<Record<string, string> | null>(null);

    const toggleButton = async () => {
        reset();
        setFilter(null)
        setIsFilteredActive(!isFilteredActive);
        await func().then(setArrayValue)
    }

    return {
        filter,
        setFilter,
        isFilteredActive,
        setIsFilteredActive,
        toggleButton
    }
}