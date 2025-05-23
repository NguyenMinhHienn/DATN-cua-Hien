import { Outlet } from "react-router-dom"
import AdminHeader from "../pages/admin/header"
import AdminSidebar from "../pages/admin/sidebar"

function AdminLayout() {
    return (
        <main className='bg-[#f6f9ff]'>
            <AdminHeader/>
            <div className='flex'>
            <AdminSidebar/>
            <div className='content w-4/5 p-6'>
                <Outlet/>
            </div>
            </div>
        </main>
    )
}

export default AdminLayout