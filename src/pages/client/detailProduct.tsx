import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ListData } from "../../services/data";
import { IProduct } from "../../inface/product";

const DetailProduct = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) return <div className="text-center mt-10 text-red-500">Mã sản phẩm không hợp lệ</div>;

    const { data: product, isLoading, isError } = useQuery<IProduct>({
        queryKey: ["product", id],
        queryFn: async () => {
            const { data } = await ListData(`products/${id}`);
            return data;
        },
    });

    const { data: relatedProducts } = useQuery<IProduct[]>({
        queryKey: ["relatedProducts"],
        queryFn: async () => {
            const { data } = await ListData("products");
            return Array.isArray(data) ? data.filter((p) => p.id !== Number(id)) : [];
        },
    });

    const [quantity, setQuantity] = useState(1); // State lưu số lượng sản phẩm
    const [selectedImage, setSelectedImage] = useState(product?.image || ""); // State lưu ảnh chính

    if (isLoading) return <div className="text-center mt-10">Đang tải thông tin sản phẩm...</div>;
    if (isError || !product) return <div className="text-center mt-10 text-red-500">Lỗi khi tải thông tin sản phẩm</div>;

    const handleAddToCart = () => {
        console.log(`Thêm sản phẩm: ${product.name}, Số lượng: ${quantity}`);
        alert(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-4">
                <Link to="/" className="hover:text-blue-500">Trang chủ</Link> / 
                <Link to="/category" className="hover:text-blue-500"> Danh mục</Link> / 
                <span className="text-gray-800"> {product.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white shadow-lg rounded-xl p-8">
                {/* Hình ảnh sản phẩm */}
                <div className="flex flex-col items-center">
                    {/* Ảnh chính */}
                    <div className="w-full max-w-md mb-4">
                        <img
                            src={selectedImage}
                            alt={product.name}
                            className="rounded-lg w-full object-contain border"
                        />
                    </div>
                    {/* Ảnh nhỏ bên dưới */}
                    <div className="flex gap-4">
                        {[product.image, product.image, product.image, product.image].map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-20 h-20 object-cover border cursor-pointer rounded-lg ${
                                    selectedImage === img ? "border-blue-500" : "border-gray-300"
                                }`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <div className="flex items-center mb-4">
                            <span className="text-yellow-500 text-xl mr-2">★★★★★</span>
                            <span className="text-gray-500">(50 đánh giá)</span>
                            <span className="ml-4 text-green-600 font-semibold">Còn hàng</span>
                        </div>
                        <p className="text-xl font-semibold text-green-600 mb-6">
                            {Number(product.price).toLocaleString("vi-VN")}₫
                        </p>
                        <p className="text-gray-600 mb-6">{product.description}</p>

                        {/* Màu sắc */}
                        <div className="mb-6">
                            <p className="font-semibold mb-2">Màu sắc:</p>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer border"></div>
                                <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer border"></div>
                            </div>
                        </div>

                        {/* Kích thước */}
                        <div className="mb-6">
                            <p className="font-semibold mb-2">Kích thước:</p>
                            <div className="flex gap-4">
                                {["XS", "S", "M", "L", "XL"].map((size) => (
                                    <button
                                        key={size}
                                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chọn số lượng sản phẩm */}
                    <div className="flex items-center mb-6">
                        <p className="font-semibold mr-4">Số lượng:</p>
                        <div className="flex items-center border border-gray-300 rounded">
                            <button
                                className="px-4 py-2 hover:bg-gray-200"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </button>
                            <p className="px-4 py-2">{quantity}</p>
                            <button
                                className="px-4 py-2 hover:bg-gray-200"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Nút thêm vào giỏ hàng */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
                        >
                            Thêm vào giỏ hàng
                        </button>
                        <Link
                            to="/"
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-center"
                        >
                            Quay lại
                        </Link>
                    </div>
                </div>
            </div>

            {/* Chính sách */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        🚚
                    </div>
                    <div>
                        <h3 className="font-semibold">Giao hàng miễn phí</h3>
                        <p className="text-gray-500 text-sm">Nhập mã bưu điện để kiểm tra</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        🔄
                    </div>
                    <div>
                        <h3 className="font-semibold">Đổi trả miễn phí</h3>
                        <p className="text-gray-500 text-sm">Miễn phí đổi trả trong 30 ngày</p>
                    </div>
                </div>
            </div>

            {/* Sản phẩm liên quan */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Tìm hiểu thêm</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {relatedProducts?.map((relatedProduct) => (
                        <div key={relatedProduct.id} className="bg-white shadow-lg rounded-lg p-4">
                            <Link to={`/detail/${relatedProduct.id}`}>
                                <img
                                    src={relatedProduct.image}
                                    alt={relatedProduct.name}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-semibold text-gray-800">{relatedProduct.name}</h3>
                                <p className="text-red-500 font-bold">
                                    {Number(relatedProduct.price).toLocaleString("vi-VN")}₫
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;
