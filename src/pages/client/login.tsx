import { useMutation } from "@tanstack/react-query";
import { User } from "../../inface/user";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const nav = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: User) => {
      console.log("Dữ liệu gửi đi:", data); // Debug: Kiểm tra dữ liệu gửi đi
      try {
        const res = await axios.post(`http://localhost:3000/login`, data);
        return res.data; // Trả về dữ liệu từ API
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        throw new Error("Đăng nhập thất bại");
      }
    },
    onSuccess: (data) => {
      console.log("API Response:", data); // Debug: Kiểm tra dữ liệu trả về từ API

      // Lưu token và vai trò vào localStorage
      localStorage.setItem("key", data.accessToken);
      localStorage.setItem("role", data.user.role);

      // Kiểm tra vai trò và chuyển hướng
      if (data.user.role === "admin") {
        nav("/admin"); // Chuyển hướng đến trang quản trị nếu vai trò là admin
      } else {
        nav("/"); // Chuyển hướng đến trang chủ nếu vai trò không phải admin
      }
    },
    onError: () => {
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    },
  });

  const onLogin = (data: User) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex h-screen w-full px-24 py-8">
      {/* Hình ảnh bên trái */}
      <div className="flex-1 flex justify-center items-center bg-blue-100 rounded">
        <div className="w-[550px] h-[300px] flex justify-center items-center bg-gray-300 text-gray-600 text-sm text-center rounded-lg">
          <img
            className="w-[550px] h-[380px] rounded"
            src="/src/assets/banner_db2.png"
            alt="Lỗi ảnh"
          />
        </div>
      </div>

      {/* Form đăng nhập */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-10">
        <div className="mb-4 mr-10">
          <h2 className="text-3xl font-semibold mb-2 text-gray-800">
            Log in to EXCLUSIVE
          </h2>
          <h4 className="">Enter your details below</h4>
        </div>
        <form onSubmit={handleSubmit(onLogin)} className="w-full max-w-xs">
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Email or Phone Number"
              className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
              {...register("email", {
                required: "Không được để trống email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Vui lòng nhập đúng định dạng email",
                },
              })}
            />
            <span className="text-red-500">{errors.email?.message}</span>
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
              {...register("password", {
                required: "Không được để trống password",
              })}
            />
            <span className="text-red-500">{errors.password?.message}</span>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-red-500 text-white font-bold text-base rounded-md hover:bg-red-600 transition-colors"
          >
            Log In
          </button>
        </form>
        <div className="flex gap-8">
          <a href="#" className="mt-3 text-red-500 text-sm hover:underline">
            Forget Password?
          </a>
          <a href="register" className="mt-3 text-red-500 text-sm hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
