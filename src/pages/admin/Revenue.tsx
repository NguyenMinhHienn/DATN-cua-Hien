import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
    id: number;
    date: string;
    total: number;
}

const Revenue = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:3000/orders");
                const data: Order[] = res.data;

                // Tính tổng doanh thu
                const total = data.reduce((sum, order) => sum + order.total, 0);

                setOrders(data);
                setTotalRevenue(total);
                setError(null); // Xóa lỗi nếu có
            } catch (error) {
                console.error("Lỗi khi tải đơn hàng:", error);
                setError("Không thể tải dữ liệu đơn hàng. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleResetRevenue = async () => {
        const confirmReset = window.confirm("Bạn có chắc chắn muốn reset toàn bộ dữ liệu doanh thu? Thao tác này không thể hoàn tác!");
        if (!confirmReset) return;

        try {
            setLoading(true);
            await axios.delete("http://localhost:3000/orders"); // Gọi API xóa toàn bộ đơn hàng
            setOrders([]);
            setTotalRevenue(0);
            setError(null);
        } catch (error) {
            setError("Không thể reset doanh thu trên server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
                Thống kê doanh thu
            </h1>
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleResetRevenue}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition"
                >
                    Reset doanh thu
                </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <p className="text-center text-red-500 text-lg">{error}</p>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                            Tổng doanh thu:{" "}
                            <span className="text-green-600">
                                ${totalRevenue.toFixed(2)}
                            </span>
                        </h2>
                        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="border border-gray-300 p-4 text-left">ID</th>
                                    <th className="border border-gray-300 p-4 text-left">Ngày</th>
                                    <th className="border border-gray-300 p-4 text-left">Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr
                                        key={order.id}
                                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                                    >
                                        <td className="border border-gray-300 p-4">{order.id}</td>
                                        <td className="border border-gray-300 p-4">
                                            {new Date(order.date).toLocaleDateString()}
                                        </td>
                                        <td className="border border-gray-300 p-4 text-green-600">
                                            ${order.total.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default Revenue;