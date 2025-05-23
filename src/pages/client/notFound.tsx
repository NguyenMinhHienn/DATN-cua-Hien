import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            {/* Tiêu đề */}
            <h1 className="text-[150px] font-semibold text-black mb-4">404 Not Found</h1>

            {/* Dòng chữ mô tả */}
            <p className="text-lg text-gray-600 mb-8">
                Your visited page not found. You may go home page.
            </p>

            {/* Nút Back to home page */}
            <Link
                to="/"
                className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors duration-300"
            >
                Back to home page
            </Link>
        </div>
    );
}

export default NotFound