import { createNewLoanAndGenerate, getLoanByPromissoryId } from '@/Services/LoanService';
import { isNumber } from '@/helpers/isNumber';
import { routes } from '@/Router/routes';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import type { EquipsEdited } from '@/Types/EquipmentTypes';
import type { INoReturnedFieldForm } from '@/Types/FormType';
import type { LoanByIdType } from '@/Types/LoanTypes';
import toast from 'react-hot-toast';
import { toastMessages } from '@/helpers/toastMessages';


export default function EditReturnEquipmHook() {
    const params = useParams();
    const navigate = useNavigate();
    const [loan, setLoan] = useState<LoanByIdType>()
    const [noReturnedList, setNoReturnedList] = useState<EquipsEdited[] | null>(null)
    const [date, setDate] = useState<string>('')
    const [maxReturn, setMax] = useState<number>(0);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<INoReturnedFieldForm>(
        { defaultValues: { equipment: loan?.loanEquipments[0].toString(), quantityNoReturned: "" } });

    useEffect(() => {
        if (!loan) {
            return
        }

        setMax(Number(loan.loanEquipments[0][0]))
    }, [loan, setMax]);


    useEffect(() => {


        if (params.promissoryNoteId && params.date) {
            setDate(params.date)
            if (isNumber(params.promissoryNoteId)) {
                getLoanByPromissoryId(Number(params.promissoryNoteId)).then(setLoan)
            }
        }
        else {
            navigate(`/${routes.LEND.VIEW_ACTIVE}`)
        }
    }, [params, navigate, setLoan, setDate])



    const handlerRecord = (idEquip: string, noReturned: string) => {
        if (!noReturnedList) {
            setNoReturnedList([])
        }
        const equipment = loan?.loanEquipments.find(e => e[5] === idEquip)
        setNoReturnedList(value => [...value!, { id: idEquip, returns: noReturned, name: equipment![1] }]);
    }

    function returnToManagenemt() {
        navigate(`/${routes.LEND.VIEW_ACTIVE}`);
    }

    const handlerSubmit = (data: INoReturnedFieldForm) => {
        if (!validateExist(data.equipment)) {
            handlerRecord(data.equipment, data.quantityNoReturned);
        }
        reset();
    }

    const validateExist = (id: string): boolean => {
        const Exists = noReturnedList?.find(e => e.id === id)
        if (!noReturnedList) {
            return false;
        }

        if (Exists) {
            return true;
        }

        return false;
    }


    const onChangeSelect = (id: string) => {
        const quantityLoan = loan?.loanEquipments.find(e => e[5] === id);

        if (quantityLoan)
            setMax(Number(quantityLoan[0]))
    }


    const handlerButton = async () => {
        const body = noReturnedList?.map(e => {
            return {
                "equipmentId": e.id,
                "quantity": e.returns
            }
        })
        await createNewLoanAndGenerate(params.promissoryNoteId!, body!, date);
        toast.success(`La factura ${toastMessages.createdSuccess} y se generó nuevo activo`);
        navigate(`/${routes.LEND.VIEW_ACTIVE}`);
    }


    return {
        errors,
        handlerButton,
        handlerRecord,
        handlerSubmit,
        handleSubmit,
        loan,
        maxReturn,
        noReturnedList,
        onChangeSelect,
        register,
        returnToManagenemt,
        validateExist,
    }
}
