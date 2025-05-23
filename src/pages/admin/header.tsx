import { FaUserCircle } from "react-icons/fa";
import { GrLogin } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminHeader = () => {
    const [searchTerm, setSearchTerm] = useState(""); // State lưu trữ chuỗi tìm kiếm
    const nav = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            nav(`/admin/list?search=${searchTerm.trim()}`); // Điều hướng đến trang danh sách sản phẩm với từ khóa tìm kiếm
        }
    };

    return (
        <header className="bg-blue-600 w-full shadow-md flex items-center p-4 relative z-50">
            {/* Logo */}
            <div className="logo w-1/5 text-white text-2xl font-bold">
                <Link to={'/admin'} className="hover:text-gray-200 transition">
                    HienThoDien
                </Link>
            </div>

            {/* Search Bar */}
            <div className="right-header w-4/5 flex justify-between items-center">
                <form className="w-[350px]" onSubmit={handleSearch}>
                    <input
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>

                {/* User Actions */}
                <ul className="flex gap-6 text-white text-2xl">
                    <li className="hover:text-gray-200 transition">
                        <Link to={'/user'}>
                            <FaUserCircle />
                        </Link>
                    </li>
                    <li className="hover:text-gray-200 transition">
                        <Link to={'/user'}>
                            <GrLogin />
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default AdminHeader;