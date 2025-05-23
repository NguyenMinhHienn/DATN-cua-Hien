import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ICategory } from "../../../inface/category";
import { message } from "antd";
import { FaMobileAlt, FaLaptop, FaClock, FaCamera, FaHeadphones, FaGamepad } from "react-icons/fa";

const icons = {
    FaMobileAlt: <FaMobileAlt />,
    FaLaptop: <FaLaptop />,
    FaClock: <FaClock />,
    FaCamera: <FaCamera />,
    FaHeadphones: <FaHeadphones />,
    FaGamepad: <FaGamepad />,
};

function EditDanhMuc() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm<ICategory>();

    const params = useParams();
    const nav = useNavigate();

    // Fetch danh mục hiện tại
    const { data, isLoading } = useQuery<ICategory>({
        queryKey: ["category", params.id],
        queryFn: async () => {
            try {
                const { data: category } = await axios.get(`http://localhost:3000/category/${params.id}`);
                reset(category);
                return category;
            } catch (error) {
                console.error("Lỗi khi tải danh mục:", error);
                throw error;
            }
        },
    });

    // Mutation để cập nhật danh mục
    const mutation = useMutation({
        mutationFn: async (updatedData: ICategory) => {
            try {
                const { data: category } = await axios.put(`http://localhost:3000/category/${params.id}`, updatedData);
                return category;
            } catch (error) {
                console.error("Lỗi khi cập nhật danh mục:", error);
            }
        },
        onSuccess: () => {
            message.success("Cập nhật danh mục thành công!");
            nav("/admin/listDanhMuc");
        },
    });

    const onSubmit = (data: ICategory) => {
        mutation.mutate(data);
    };

    // Theo dõi giá trị của trường "icon"
    const selectedIcon = watch("icon");

    return (
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-white mb-6">
                Cập nhật danh mục
            </h1>

            {isLoading && <p className="text-center text-gray-500">Đang tải dữ liệu...</p>}

            {data && (
                <form
                    className="grid grid-cols-1 gap-6 bg-white p-6 rounded-lg shadow-md"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Tên danh mục */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Tên danh mục:
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập tên danh mục"
                            {...register("name", { required: "Tên danh mục không được để trống" })}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Mô tả:
                        </label>
                        <textarea
                            placeholder="Nhập mô tả"
                            {...register("description", { required: "Mô tả không được để trống" })}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    {/* Chọn Icon */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Chọn Icon:
                        </label>
                        <select
                            {...register("icon", { required: "Vui lòng chọn icon" })}
                            defaultValue=""
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Chọn icon --</option>
                            {Object.keys(icons).map((iconKey) => (
                                <option key={iconKey} value={iconKey}>
                                    {iconKey}
                                </option>
                            ))}
                        </select>
                        {errors.icon && <p className="text-red-500 text-sm mt-1">{errors.icon.message}</p>}
                    </div>

                    {/* Hiển thị Icon đã chọn */}
                    <div className="flex items-center gap-4">
                        <label className="block text-gray-700 font-medium">
                            Icon đã chọn:
                        </label>
                        <div className="text-2xl text-blue-500">
                            {icons[selectedIcon as keyof typeof icons]}
                        </div>
                    </div>

                    {/* Nút cập nhật */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-lg hover:from-green-500 hover:to-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Cập nhật
                    </button>
                </form>
            )}
        </div>
    );
}

export default EditDanhMuc;
