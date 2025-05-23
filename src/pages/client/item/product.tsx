import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { IProduct } from "../../../inface/product";
import StarProduct from "./rating";
import { useCart } from "../../../context/CartContext";

type Props = {
    products: IProduct;
};

const ItemProduct = ({ products }: Props) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(products);
        alert(`Đã thêm sản phẩm "${products.name}" vào giỏ hàng!`);
    };

    return (
        <div key={products.id} className="bg-white flex flex-col h-[450px] rounded-lg shadow-md overflow-hidden">
            {/* Hình ảnh sản phẩm */}
            <div className="relative bg-gray-100 h-[300px] flex items-center justify-center">
                <Link to={`/detail/${products.id}`}>
                    <img
                        src={products.image}
                        alt={products.name}
                        className="max-h-full max-w-full object-contain p-4"
                    />
                </Link>
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                    <AiOutlineHeart className="w-9 h-9 rounded-full bg-white p-2 hover:bg-gray-100 transition-colors" />
                    <AiOutlineEye className="w-9 h-9 rounded-full bg-white p-2 hover:bg-gray-100 transition-colors" />
                </div>
            </div>

            {/* Thông tin sản phẩm */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-800 line-clamp-2">{products.name}</h3>
                <div className="flex items-center mt-2 text-yellow-300">
                    <p className="text-red-500 font-semibold text-lg pr-2">${products.price}</p>
                    <StarProduct score={products.rating} />
                    <span className="ml-2 mb-0.5 text-gray-600">(35)</span>
                </div>
            </div>

            {/* Nút thêm vào giỏ hàng */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    );
};

export default ItemProduct;