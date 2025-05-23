import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createData } from "../../../services/data";
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

function AddDanhMuc() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<ICategory>();

    const nav = useNavigate();

    const mutation = useMutation({
        mutationFn: async (data: ICategory) => {
            try {
                const { data: category } = await createData<ICategory>({
                    route: "category",
                    data: data,
                });
                return category;
            } catch (error) {
                console.log(error);
            }
        },
        onSuccess: () => {
            message.success("Thêm danh mục thành công!");
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
                Thêm mới danh mục
            </h1>
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
                        {...register("icon", { required: "Vui lòng chọn một icon" })}
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

                {/* Nút thêm mới */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-lg hover:from-green-500 hover:to-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Thêm mới
                </button>
            </form>
        </div>
    );
}

export default AddDanhMuc;
