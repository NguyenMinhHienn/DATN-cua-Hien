import { useQuery } from "@tanstack/react-query";
import { ListData } from "../../services/data";
import { IProduct } from "../../inface/product";
import { ICategory } from "../../inface/category";

const ProductsByCategory = () => {
    // Fetch danh sách danh mục
    const { data: categories, isLoading: isLoadingCategories } = useQuery<ICategory[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await ListData("category");
            return response.data;
        },
    });

    // Fetch danh sách sản phẩm
    const { data: products, isLoading: isLoadingProducts } = useQuery<IProduct[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await ListData("products");
            return response.data;
        },
    });

    if (isLoadingCategories || isLoadingProducts) {
        return <p>Đang tải dữ liệu...</p>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Sản phẩm theo danh mục</h1>
            {categories?.map((category) => (
                <div key={category.id} className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {products
                            ?.filter((product) => product.category === category.name)
                            .map((product) => (
                                <div
                                    key={product.id}
                                    className="border p-4 rounded-lg shadow-md"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-40 object-cover mb-4"
                                    />
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p className="text-red-500 font-bold">
                                        ${product.price}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductsByCategory;