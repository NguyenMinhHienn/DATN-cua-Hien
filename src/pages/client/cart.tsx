import { useCart } from "../../context/CartContext";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartClient = () => {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
    const nav = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("key");
        if (!token) {
            alert("Bạn cần đăng nhập để truy cập giỏ hàng.");
            nav("/login"); // Chuyển hướng đến trang đăng nhập
        }
    }, [nav]);

    // State để lưu thông tin người dùng
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        phone: "",
        address: "",
        paymentMethod: "cash", // Mặc định là thanh toán tiền mặt
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert("Giỏ hàng trống. Không thể thanh toán.");
            return;
        }

        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
            alert("Vui lòng nhập đầy đủ thông tin trước khi thanh toán.");
            return;
        }

        try {
            const orderData = {
                customer: customerInfo,
                items: cart.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
                total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
                date: new Date().toISOString(),
            };

            const res = await axios.post("http://localhost:3000/orders", orderData);
            alert("Thanh toán thành công!");

            // Gửi dữ liệu mới đến trang thống kê
            window.dispatchEvent(new CustomEvent("orderUpdated", { detail: res.data }));

            // Xóa giỏ hàng sau khi thanh toán
            clearCart();
        } catch (error) {
            console.error("Lỗi thanh toán:", error);
            alert("Thanh toán thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Giỏ hàng của bạn</h1>
            {cart.length === 0 ? (
                <p className="text-center text-gray-600">Giỏ hàng trống</p>
            ) : (
                <div className="space-y-4">
                    {cart.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between border-b pb-4"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg border"
                                />
                                <div>
                                    <p className="font-semibold text-lg">{item.name}</p>
                                    <p className="text-gray-600">Giá: ${item.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    className="px-3 py-1 border rounded hover:bg-gray-200"
                                >
                                    -
                                </button>
                                <p className="px-4">{item.quantity}</p>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="px-3 py-1 border rounded hover:bg-gray-200"
                                >
                                    +
                                </button>
                            </div>
                            <p className="font-semibold text-lg">
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {cart.length > 0 && (
                <div className="mt-8 border-t pt-4">
                    <h2 className="text-xl font-bold text-right">
                        Tổng tiền: $
                        {cart
                            .reduce((total, item) => total + item.price * item.quantity, 0)
                            .toFixed(2)}
                    </h2>

                    {/* Form nhập thông tin khách hàng */}
                    <div className="mt-6 space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Tên khách hàng:
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={customerInfo.name}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tên của bạn"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Số điện thoại:
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={customerInfo.phone}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Địa chỉ:
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={customerInfo.address}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập địa chỉ giao hàng"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Phương thức thanh toán:
                            </label>
                            <select
                                name="paymentMethod"
                                value={customerInfo.paymentMethod}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="cash">Tiền mặt</option>
                                <option value="credit">Thẻ tín dụng</option>
                                <option value="paypal">PayPal</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="mt-4 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
                    >
                        Thanh toán
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartClient;