import { routes } from '@/Router/routes';
import { useClientStore } from '@/Store/Client/ClientStore';
import { useEquipmentsStore } from '@/Store/Equipment/EquipmentStore';
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useShallow } from 'zustand/shallow';

export default function LoanCompleted() {
    const setClient = useClientStore(useShallow(s => s.setCLient))
    const clearList = useEquipmentsStore(useShallow(s => s.clearList))

    useEffect(() => {
        setClient(null);
        clearList();
    }, [setClient, clearList]);


    return (
        <Navigate to={`/${routes.LEND.VIEW_ACTIVE}`} replace />
    )
}
