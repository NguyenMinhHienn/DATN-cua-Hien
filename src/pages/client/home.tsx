import { useState, useEffect } from "react"
import { FaCheckCircle, FaChevronRight, FaHeadset, FaShippingFast } from "react-icons/fa"
import { FaArrowLeft, FaArrowRight  } from "react-icons/fa"
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai"
import { AiFillStar } from "react-icons/ai"
import { Link } from "react-router-dom"
import ItemCategory from "./item/category"
import { useQuery } from "@tanstack/react-query"
import { ICategory } from "../../inface/category"
import { ListCategory } from "../../services/category"
import ItemProduct from "./item/product"
import { IProduct } from "../../inface/product"
import { ListData } from "../../services/data"

function HomePage() {


    const {data} = useQuery<ICategory[]>({
        queryKey:["category"],
        queryFn: async ()=>{
            const {data:category} = await ListCategory("category")
            return category
        }
    })

    const {data:dataProduct} = useQuery<IProduct[]>({
        queryKey:["products"],
        queryFn: async ()=>{
            const {data:product} = await ListData("products")
            return product
        }
    })

    const slides = [
        {
            id: 1,
            image: "src/assets/banner1.png",
        },
        {
            id: 2,
            image: "src/assets/banner2.png",
        },
        {
            id: 3,
            image: "src/assets/banner1.png",
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Tự động chuyển slide banner
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index:number) => {
        setCurrentSlide(index);
    }
    
    return (
        <div>
            <div className="flex px-8">
                {/* Mục lục */}
                <div className="w-1/4 p-7">
                    <ul className="space-y-2">
                        {data && data.map((category) => (
                            <Link to={`/category/${category.name}`} key={category.id}>
                                <li className="flex justify-between items-center text-gray-600 hover:text-black cursor-pointer py-2 px-[40px]">
                                    {category.name} <FaChevronRight className="text-sm" />
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="border-r h-[380px]"></div>
                {/* Hình ảnh banner */}
                <div className="w-3/4 p-8 relative">
                    <div className="relative">
                        <img src={slides[currentSlide].image} alt="Slide" className="w-full px-[40px]" />
                    </div>
                    {/* Dots */}
                    <div className="flex justify-center mt-3 space-x-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full focus:outline-none transition-all ${index === currentSlide ? "bg-red-500 scale-125" : "bg-gray-400"}`}
                                onClick={() => goToSlide(index)}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Categories */}
            <div>
                <div className="flex items-center px-24 pt-8">
                    <div className=" bg-red-500 w-[30px] rounded-lg h-[50px]"></div>
                    <h3 className="p-2 text-red-500 font-bold">Categories</h3>
                </div>
                <div>
                    <div className="px-24 pt-4 flex items-center w-full">
                        <h1 className="text-[35px] pr-[40px]">Browse By Category</h1>
                        <div className="flex gap-2 pl-[900px]">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 border border-white cursor-pointer">
                                <FaArrowLeft className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 border border-white cursor-pointer">
                                <FaArrowRight className="w-5 h-5 text-gray-600" />
                            </div>
                        </div>
                    </div>
                    <div className="py-4 gap-6 flex px-24">
                        {data && data.map(category => (
                            <ItemCategory key={category.id} category={category}/>
                        ))}
                    </div>
                </div>
            </div>

            {/* Best Selling Products */}
            <div className="py-4">
                <div className="flex items-center px-24">
                    <div className=" bg-red-500 w-[30px] rounded-lg h-[50px]"></div>
                    <h3 className="p-2 text-red-500 font-bold">This Month</h3>
                </div>
                <div>
                    <div className="px-24 pt-4 flex items-center w-full">
                        <h1 className="text-[35px] pr-[70px]">Best Selling Products</h1>
                        <div className="pl-[850px]">
                            <button className="text-white bg-red-500 p-2">View All</button>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-4 gap-6 px-24 pt-4">
                            {dataProduct && dataProduct.slice(0, 4).map((product: IProduct) => (
                                <ItemProduct key={product.id} products={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Banner giữa trang */}
            <div className="py-4 h-auto">
                <div className="px-24">
                    <div className="relative bg-gradient-to-r from-black to-gray-900 text-white rounded-lg overflow-hidden">
                        {/* Chữ "Categories" ở góc trên bên trái */}
                        <div className="absolute top-16 left-8 text-green-400 font-semibold text-sm">
                            Categories
                        </div>
                        {/* Nội dung chính của banner */}
                        <div className="flex items-center justify-between p-8">
                            {/* Phần bên trái: Tiêu đề, bộ đếm, và nút */}
                            <div className="flex flex-col gap-6">
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                    ENHANCE YOUR <br /> MUSIC EXPERIENCE
                                </h1>
                                {/* Bộ đếm thời gian */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-semibold text-lg">
                                            23
                                        </div>
                                        <span className="text-sm mt-2">Hours</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-semibold text-lg">
                                            05
                                        </div>
                                        <span className="text-sm mt-2">Days</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-semibold text-lg">
                                            59
                                        </div>
                                        <span className="text-sm mt-2">Minutes</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-semibold text-lg">
                                            35
                                        </div>
                                        <span className="text-sm mt-2">Seconds</span>
                                    </div>
                                </div>
                                <div>
                                    <button className="bg-green-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">
                                        Buy Now!
                                    </button> 
                                </div>
                            </div>
                            {/* Phần bên phải: Hình ảnh loa */}
                            <div className="hidden md:block relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent rounded-full blur-3xl scale-125"></div>
                                <img src="src/assets/banner_banner.png" alt="JBL Speaker" className="w-[500px] h-auto object-contain m-[70px]" />
                            </div>
                        </div>  
                    </div>
                </div>
            </div>

            {/* Our Products */}
            <div className="py-4">
                <div className="flex items-center px-24 pt-8">
                    <div className="bg-red-500 w-[30px] rounded-lg h-[50px]"></div>
                    <h3 className="p-2 text-red-500 font-bold">Our Products</h3>
                </div>
                <div className="px-24 pt-4 flex items-center w-full">
                    <h1 className="text-[35px] pr-[40px] font-bold">Explore Our Products</h1>
                    <div className="flex gap-2 ml-auto">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 border border-white cursor-pointer hover:bg-gray-300 transition-colors">
                            <FaArrowLeft className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 border border-white cursor-pointer hover:bg-gray-300 transition-colors">
                            <FaArrowRight className="w-5 h-5 text-gray-600" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-6 px-24 pt-4">
                    {dataProduct && dataProduct.map((product:IProduct) => (
                        <ItemProduct key={product.id} products={product} />
                    ))}
                </div>
                <div className="px-[650px] pt-4 pb-10">
                    <button className="px-4 py-2 bg-red-500 text-center text-white text-[17px] hover:bg-red-700">View All Products</button>
                </div>
            </div>

            {/* Featured & New Arrival */}
            <div className="py-4">
                <div className="flex items-center px-24 pt-8">
                    <div className="bg-red-500 w-[30px] rounded-lg h-[50px]"></div>
                    <h3 className="p-2 text-red-500 font-bold">Featured</h3>
                </div>
                <div className="px-24 pt-4 flex items-center w-full">
                    <h1 className="text-[35px] pr-[40px] font-bold">New Arrival</h1>
                </div>
                <div className="px-24 py-4 grid grid-cols-2 gap-4">
                    {/* Banner 1: PlayStation 5 */}
                    <div className="relative bg-black text-white rounded-lg overflow-hidden row-span-2">
                        <img src="src/assets/banner_db1.png" alt="PlayStation 5" className="w-full h-full object-cover opacity-50"/>
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-2xl font-bold">PlayStation 5</h3>
                            <p className="mt-2 text-sm">Black and White version of the PS5 coming out on sale.</p>
                            <button className="mt-4 text-white font-semibold py-2 hover:text-red-500 transition-colors hover:underline">
                                Shop Now
                            </button>
                        </div>
                    </div>
                    {/* Banner 2: Women's Collections */}
                    <div className="relative bg-black text-white rounded-lg overflow-hidden">
                        <img src="src/assets/banner_db2.png" alt="Women's Collections" className="w-full h-full object-cover opacity-50"/>
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-xl font-bold">Women's Collections</h3>
                            <p className="mt-2 text-sm">Featured woman collections that give you another vibe.</p>
                            <button className="mt-4 text-white font-semibold py-2 hover:text-red-500 transition-colors hover:underline">
                                Shop Now
                            </button> 
                        </div>
                    </div>
                    <div className="flex gap-4">
                        {/* Banner 3: Speakers */}
                        <div className="relative bg-black text-white rounded-lg overflow-hidden flex-1">
                            <img src="src/assets/banner_db3.png" alt="Speakers" className="w-full h-full object-cover opacity-50"/>
                            <div className="absolute bottom-8 left-8">
                                <h3 className="text-xl font-bold">Speakers</h3>
                                <p className="mt-2 text-sm">Amazon wireless speakers</p>
                                <button className="mt-4 text-white font-semibold py-2 hover:text-red-500 transition-colors hover:underline">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                        {/* Banner 4: Perfume */}
                        <div className="relative bg-black text-white rounded-lg overflow-hidden flex-1">
                            <img src="src/assets/banner_db4.png" alt="Perfume" className="w-full h-full object-cover opacity-50"/>
                            <div className="absolute bottom-8 left-8">
                                <h3 className="text-xl font-bold">Perfume</h3>
                                <p className="mt-2 text-sm">GUCCI INTENSE OUD EDP</p>
                                <button className="mt-4 text-white font-semibold py-2 hover:text-red-500 transition-colors hover:underline">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Info */}
            <div className="py-24">
                <div className="px-24">
                    <div className="flex justify-center gap-12">
                        {/* Free and Fast Delivery */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black">
                                <FaShippingFast className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-gray-800">FREE AND FAST DELIVERY</h3>
                            <p className="mt-2 text-sm text-gray-600">Free delivery for all orders over $140</p>
                        </div>
                        {/* 24/7 Customer Service */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 bg-black">
                                <FaHeadset className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-gray-800">24/7 CUSTOMER SERVICE</h3>
                            <p className="mt-2 text-sm text-gray-600">Friendly 24/7 customer support</p>
                        </div>
                        {/* Money Back Guarantee */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 bg-black">
                                <FaCheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-gray-800">MONEY BACK GUARANTEE</h3>
                            <p className="mt-2 text-sm text-gray-600">We return money within 30 days</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage