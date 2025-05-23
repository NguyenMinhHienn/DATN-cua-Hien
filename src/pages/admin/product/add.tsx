import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../inface/product";
import { createData, ListData } from "../../../services/data";
import { ICategory } from "../../../inface/category";
import { message } from "antd";
import { useState } from "react";
import axios from "axios";

function AddP() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IProduct>();
  const nav = useNavigate();

  // Fetch danh sách danh mục
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await ListData("category");
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: IProduct) => {
      try {
        const { data: product } = await createData<IProduct>({ route: "products", data: data });
        return product;
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        throw new Error("Thêm sản phẩm thất bại");
      }
    },
    onSuccess: () => {
      message.success("Thêm sản phẩm thành công!");
      nav("/admin/list");
    },
    onError: () => {
      message.error("Thêm sản phẩm thất bại. Vui lòng thử lại.");
    },
  });

  const [image, setImage] = useState<string>(""); // Ảnh chính
  const [loading, setLoading] = useState<boolean>(false);

  const upLoadImage = async (files: FileList | null) => {
    if (!files) return;
    setLoading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      formData.append("upload_preset", "asm_fe2");
    }

    const endPoint = "https://api.cloudinary.com/v1_1/dy0gx6iz7/image/upload";
    try {
      const { data } = await axios.post(endPoint, formData);
      setImage(data.url); // Lưu ảnh chính
      reset({
        image: data.url,
      });
    } catch (error) {
      message.error("Lỗi tải ảnh");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: IProduct) => {
    const productData = {
      ...data,
    };
    console.log("Product data:", productData); // Kiểm tra dữ liệu trước khi gửi
    mutation.mutate(productData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Thêm mới sản phẩm
      </h1>
      {isLoadingCategories ? (
        <p className="text-center text-gray-500">Đang tải danh mục...</p>
      ) : isErrorCategories ? (
        <p className="text-center text-red-500">Không thể tải danh mục. Vui lòng thử lại sau.</p>
      ) : (
        <form
          className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Tên sản phẩm */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Tên sản phẩm:
            </label>
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              {...register("name", { required: "Tên sản phẩm không được để trống" })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Danh mục */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Danh mục:
            </label>
            <select
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("category", { required: "Vui lòng chọn danh mục" })}
            >
              <option value="">Chọn danh mục</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {/* Hình ảnh chính */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Hình ảnh chính:
            </label>
            <input
              type="file"
              onChange={(e) => upLoadImage(e.target.files)}
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
            {loading && <p className="text-gray-500 text-sm mt-1">Đang tải ảnh...</p>}
            {image && <img src={image} alt="Product" className="mt-4 w-32 h-32 object-cover rounded-lg shadow-md" />}
            <input
              type="hidden"
              {...register("image", { required: "Hình ảnh chính không được để trống" })}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          {/* Giá */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Giá:
            </label>
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              {...register("price", {
                required: "Giá không được để trống",
                min: { value: 0, message: "Giá phải lớn hơn 0" },
              })}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          {/* Màu sắc */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Màu sắc:
            </label>
            <input
              className="w-full border border-gray-300 p-3 rounded-lg"
              type="color"
              {...register("color", { required: "Màu sắc không được để trống" })}
            />
            {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>}
          </div>

          {/* Kích thước */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Kích thước:
            </label>
            <select
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("size", { required: "Vui lòng chọn kích thước" })}
            >
              <option value="">Chọn kích thước</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size.message}</p>}
          </div>

          {/* Số lượng */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Số lượng:
            </label>
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              {...register("quantity", {
                required: "Số lượng không được để trống",
                min: { value: 0, message: "Số lượng không được âm" },
              })}
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
          </div>

          {/* Mô tả */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Mô tả:
            </label>
            <textarea
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("description", { required: "Mô tả không được để trống" })}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Trạng thái:
            </label>
            <select
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("status", { required: "Vui lòng chọn trạng thái" })}
            >
              <option value="">Chọn trạng thái</option>
              <option value="inStock">Còn hàng</option>
              <option value="offStock">Hết hàng</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
          </div>

          <button
            className="col-span-2 bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-lg hover:from-green-500 hover:to-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Thêm mới
          </button>
        </form>
      )}
    </div>
  );
}

export default AddP;
