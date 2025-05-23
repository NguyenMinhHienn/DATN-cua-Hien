import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { IProduct } from "../../inface/product";
import { ListData } from "../../services/data";
import ItemProduct from "./item/product";
import { Pagination } from "antd";

const Category = () => {
    const { name } = useParams<{ name: string }>();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Fetch danh sách sản phẩm
    const { data: products = [], isLoading, isError } = useQuery<IProduct[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await ListData("products");
            return data;
        },
    });

    // Fetch danh sách danh mục (dạng object, không phải string[])
    const { data: categories = [] } = useQuery<any[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await ListData("categories");
            return data;
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading products</div>;

    // Lọc sản phẩm theo danh mục (nếu có danh mục được chọn)
    const filteredProducts = name && name !== "all"
        ? products.filter((product) => product.category === name)
        : products;

    // Lấy các sản phẩm cho trang hiện tại
    const displayedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Hàm để thay đổi trang
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto flex">
            {/* Sidebar danh mục */}
            <div className="w-1/4 p-4 border-r">
                <h2 className="text-xl font-semibold mb-4">Danh mục sản phẩm</h2>
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/category/all"
                            className={`block px-4 py-2 rounded-lg ${
                                name === "all" || !name
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-gray-800 hover:bg-gray-100"
                            }`}
                        >
                            Tất cả danh mục
                        </Link>
                    </li>
                    {categories && categories.map((category: any) => (
                        <li key={category.id}>
                            <Link
                                to={`/category/${category.name}`}
                                className={`block px-4 py-2 rounded-lg ${
                                    name === category.name
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-gray-800 hover:bg-gray-100"
                                }`}
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="w-3/4 p-4">
                <h2 className="text-2xl font-semibold mb-4">
                    {name === "all" || !name ? "Tất cả sản phẩm" : `Danh mục: ${name}`}
                </h2>
                <div className="grid grid-cols-4 gap-6">
                    {displayedProducts.map((product: IProduct) => (
                        <ItemProduct key={product.id} products={product} />
                    ))}
                </div>

                {/* Phân trang */}
                <div className="flex justify-center items-center mt-6 space-x-2">
                    <Pagination
                        current={currentPage}
                        total={filteredProducts.length}
                        pageSize={itemsPerPage}
                        onChange={onPageChange}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default Category;
