import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type Props = {
    score: number;
};

const StarProduct = ({ score }: Props) => {
    return (
        <div className="boxstar flex gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) =>
                i < score ? <AiFillStar key={i} size={20} /> : <AiOutlineStar key={i} size={20} />
            )}
        </div>
    )
}

export default StarProduct
