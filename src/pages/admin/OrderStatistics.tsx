import { useEffect, useState } from "react";
import axios from "axios";

interface Customer {
    name: string;
    phone: string;
    address: string;
    paymentMethod: string;
}

interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
}

interface Order {
    id: number;
    customer: Customer;
    items: OrderItem[];
    total: number;
    date: string;
}

const OrderStatistics = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:3000/orders");
                console.log("Dữ liệu trả về từ API:", res.data); // Kiểm tra dữ liệu
                setOrders(res.data);
                setError(null);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                setError("Không thể tải dữ liệu đơn hàng.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();

        // Lắng nghe sự kiện cập nhật đơn hàng
        const handleOrderUpdated = (event: CustomEvent) => {
            setOrders((prevOrders) => [...prevOrders, event.detail]);
        };

        window.addEventListener("orderUpdated", handleOrderUpdated as EventListener);

        return () => {
            window.removeEventListener("orderUpdated", handleOrderUpdated as EventListener);
        };
    }, []);

    // Hàm reset thống kê đơn hàng
    const handleResetOrders = async () => {
        const confirmReset = window.confirm("Bạn có chắc chắn muốn reset toàn bộ thống kê đơn hàng? Thao tác này không thể hoàn tác!");
        if (!confirmReset) return;

        try {
            setLoading(true);
            await axios.delete("http://localhost:3000/orders"); // Gọi API xóa toàn bộ đơn hàng trên server
            setOrders([]);
            setError(null);
        } catch (error) {
            setError("Không thể reset đơn hàng trên server.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (orders.length === 0) {
        return <p className="text-center text-gray-500">Không có đơn hàng nào.</p>;
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
                Thống kê đơn hàng
            </h1>
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleResetOrders}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition"
                >
                    Reset thống kê
                </button>
            </div>
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="border border-gray-300 p-4 text-left">ID</th>
                        <th className="border border-gray-300 p-4 text-left">Tên khách hàng</th>
                        <th className="border border-gray-300 p-4 text-left">Số điện thoại</th>
                        <th className="border border-gray-300 p-4 text-left">Địa chỉ</th>
                        <th className="border border-gray-300 p-4 text-left">Phương thức thanh toán</th>
                        <th className="border border-gray-300 p-4 text-left">Tổng tiền</th>
                        <th className="border border-gray-300 p-4 text-left">Ngày</th>
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
                                {order.customer?.name || "Không có tên"}
                            </td>
                            <td className="border border-gray-300 p-4">
                                {order.customer?.phone || "Không có số điện thoại"}
                            </td>
                            <td className="border border-gray-300 p-4">
                                {order.customer?.address || "Không có địa chỉ"}
                            </td>
                            <td className="border border-gray-300 p-4">
                                {order.customer?.paymentMethod === "cash"
                                    ? "Tiền mặt"
                                    : order.customer?.paymentMethod === "credit"
                                    ? "Thẻ tín dụng"
                                    : order.customer?.paymentMethod === "paypal"
                                    ? "PayPal"
                                    : "Không xác định"}
                            </td>
                            <td className="border border-gray-300 p-4 text-green-600">
                                ${order.total.toFixed(2)}
                            </td>
                            <td className="border border-gray-300 p-4">
                                {new Date(order.date).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderStatistics;