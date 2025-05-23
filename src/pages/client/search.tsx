import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ListData } from "../../services/data";
import { IProduct } from "../../inface/product";
import ItemProduct from "./item/product";

const SearchPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query") || ""; // Lấy chuỗi tìm kiếm từ URL

    // Fetch danh sách sản phẩm
    const { data: products = [], isLoading, isError } = useQuery<IProduct[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const { data: products } = await ListData("products");
            return products;
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading products</div>;

    // Lọc sản phẩm theo chuỗi tìm kiếm (không phân biệt chữ hoa/chữ thường)
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Kết quả tìm kiếm cho: "{query}"</h1>
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ItemProduct key={product.id} products={product} />
                    ))}
                </div>
            ) : (
                <p>Không tìm thấy sản phẩm nào phù hợp.</p>
            )}
        </div>
    );
};

export default SearchPage;