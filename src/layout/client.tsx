import { Outlet } from "react-router-dom"
import ClientFooter from "../pages/client/footer"
import ClientHeader from "../pages/client/header"
import HeaderMot from "../pages/client/header_mot"

function ClientLayout() {
    return (
        <>
            <HeaderMot />
            <ClientHeader />
                <main className="h-auto">
                    <Outlet />
                </main>
            <ClientFooter />
        </>
    )
}

export default ClientLayout