import { BrowserRouter, Route, Routes } from 'react-router'
import { routes } from './routes'
import Dashboard from '@/Layouts/Dashboard'
import Lendingpage from '@/Pages/Loan/Lendingpage'
import ClientManagement from '@/Pages/Client/ClientManagement'
import NewClient from '@/Pages/Client/NewClient'
import EditClient from '@/Pages/Client/EditClient'
import FindClient from '@/Pages/Loan/FindClient'
import EquipmentManagement from '@/Pages/Equipment/EquipmentManagement'
import NewEquipment from '@/Pages/Equipment/NewEquipment'
import EditEquipment from '@/Pages/Equipment/EditEquipment'
import ViewActivedLoans from '@/Pages/Loan/ActiveLoans'
import LoanCompleted from '@/guards/LoanCompleted'
import ViewDetailsInvoice from '@/Pages/Invoice/ViewDetailsInvoice'
import HistoryLoans from '@/Pages/Loan/HistoryLoans'
import EditReturnEquipm from '@/Pages/Loan/EditReturnEquipm'


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.HOME} Component={Dashboard}>
                    <Route path={routes.CLIENT.CLIENT_MANAGEMENT} Component={ClientManagement} />
                    <Route path={routes.EQUIPMENT.EQUIPMENT_MANAGEMENT} Component={EquipmentManagement} />
                    <Route path={routes.LEND.VIEW_ACTIVE} Component={ViewActivedLoans} />
                    <Route path={routes.LEND.VIEW_ACTIVE_COMPLETED} Component={LoanCompleted} />
                    <Route path={`${routes.INVOICE}/:promissoryId`} Component={ViewDetailsInvoice} />
                    <Route path={routes.LEND.HISTORY} Component={HistoryLoans} />


                    <Route path={routes.FORMS}>
                        <Route path={`${routes.LEND.EDIT_RETURN}/:promissoryNoteId/:date?`} Component={EditReturnEquipm} />
                        <Route path={`${routes.CLIENT.FIND}/:document?`} Component={FindClient} />
                        <Route path={routes.CLIENT.REGISTER} Component={NewClient} />
                        <Route path={`${routes.CLIENT.REGISTER_LOAN}`} Component={NewClient} />
                        <Route path={`${routes.CLIENT.EDIT}/:id`} Component={EditClient} />
                        <Route path={routes.EQUIPMENT.ADD} Component={NewEquipment} />
                        <Route path={`${routes.EQUIPMENT.EDIT}/:id`} Component={EditEquipment} />
                        <Route path={routes.LEND.ADD} Component={Lendingpage} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
