import { BrowserRouter, Route, Routes } from 'react-router'
import { routes } from './routes'
import Dashboard from '@/Layouts/Dashboard'
import Homepage from '@/Pages/Homepage'
import Lendingpage from '@/Pages/Lendingpage'
import RegisterUser from '@/Pages/RegisterUser'


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.HOME} Component={Dashboard}>
                    <Route path={routes.HOME} Component={Homepage} />

                    <Route path={routes.FORMS}>
                        <Route path={routes.ADD_LEND} Component={Lendingpage} />
                        <Route path={routes.REGISTER_CLIENT} Component={RegisterUser} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
