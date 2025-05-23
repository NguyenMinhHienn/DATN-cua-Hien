import { Link } from "react-router-dom";
import { ICategory } from "../../../inface/category";
import { FaMobileAlt, FaLaptop, FaClock, FaCamera, FaHeadphones, FaGamepad } from "react-icons/fa";

const iconMap: { [key: string]: JSX.Element } = {
    FaMobileAlt: <FaMobileAlt size={40} />,
    FaLaptop: <FaLaptop size={40} />,
    FaClock: <FaClock size={40} />,
    FaCamera: <FaCamera size={40} />,
    FaHeadphones: <FaHeadphones size={40} />,
    FaGamepad: <FaGamepad size={40} />
};

type Props = {
    category: ICategory;
};

const ItemCategory = ({ category }: Props) => {
    return (
        <div>
            <Link to={`/category/${category.name}`}>
                <div className="border border-gray-500 w-[200px] h-[150px] flex flex-col items-center justify-center hover:bg-red-600 hover:text-white">
                    <div className="w-12 h-12 flex items-center justify-center">
                        {iconMap[category.icon] || "Lỗi icon"}
                    </div>
                    <h2 className="text-center text-[20px] py-2">{category.name}</h2>
                </div>
            </Link>
        </div>
    );
};

export default ItemCategory;
