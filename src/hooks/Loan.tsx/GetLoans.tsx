import { getLoans } from "@/Services/LoanService";
import type { LoanType } from "@/Types/LoanTypes";
import { useEffect, useState } from "react";


export default function GetLoansHook() {
    const [data, setData] = useState<LoanType[]>([]);

    useEffect(() => {
        getLoans(true).then(setData)
    }, [setData]);


    return {
        data,
        setData
    }
}
