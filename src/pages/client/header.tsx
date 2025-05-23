import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus, FaHeart } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

function ClientHeader() {
    const [searchTerm, setSearchTerm] = useState(""); // State lưu trữ chuỗi tìm kiếm
    const nav = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            nav(`/search?query=${searchTerm.trim()}`); // Điều hướng đến trang tìm kiếm
        }
    };

    return (
        <header className="border">
            <div className="max-w-8xl mx-auto flex items-center justify-between px-24">
                {/* Logo */}
                <div className="pr-[150px] font-bold text-2xl">
                    <Link to={''}>HienThoDien</Link>
                </div>

                {/* Phần nav */}
                <div className="flex">
                    <nav>
                        <ul className="flex gap-6 py-4 text-[18px] px-[110px]">
                            <li><Link to={''} className="hover:text-gray-500 hover:underline">Home</Link></li>
                            <li><Link to={'contact'} className="hover:text-gray-500 hover:underline">Contact</Link></li>
                            <li><Link to={'detail/:id'} className="hover:text-gray-500 hover:underline">About</Link></li>
                            <li><Link to={'login'} className="hover:text-gray-500 hover:underline">Sign</Link></li>
                            <li><Link to={'cart'} className="hover:text-gray-500 hover:underline">Cart</Link></li>
                            <li><Link to={'category'} className="hover:text-gray-500 hover:underline">Category</Link></li>
                            <li><Link to={'blog'} className="hover:text-gray-500 hover:underline">Blog</Link></li>
                        </ul>
                    </nav>
                </div>

                {/* Tìm kiếm + icon */}
                <div className="flex items-center gap-4">
                    <form className="relative" onSubmit={handleSearch}>
                        <input
                            className="text-black border outline-none px-5 py-1 rounded w-[200px]"
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="absolute right-2 top-2">
                            <CiSearch className="w-5 h-5" />
                        </button>
                    </form>

                    <ul className="flex gap-3">
                        <li>
                            <FaHeart className="w-5 h-5 mt-1 cursor-pointer hover:text-red-500" />
                        </li>
                        <li>
                            <Link to={'cart'}><FaCartPlus className="w-5 h-5 mt-1 cursor-pointer hover:text-green-500" /></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default ClientHeader;
