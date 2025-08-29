import { useState } from "react";


export default function useAsideHook() {
    const [lendingOptions, setLendingOptions] = useState<boolean>(false);
    const [clientOptions, setClientOptions] = useState<boolean>(false);

    function SwitchLendingOptions() {
        setLendingOptions(!lendingOptions);
    }

    function SwitchClientOptions() {
        setClientOptions(!clientOptions);
    }

    return {
        clientOptions,
        lendingOptions,
        SwitchClientOptions,
        SwitchLendingOptions
    }
}
