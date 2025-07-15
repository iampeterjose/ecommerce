import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-500" size={16} />);
        } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" size={16} />);
        } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" size={16} />);
        }
    }
    
    return (
        <span className="flex items-center gap-2 my-1 justify-center">
            <span className="flex gap-0.5 justify-center">
                {stars}
            </span>
            <span className="ml-1 text-[#1976D2] text-sm font-bold bg-[#F5F5F5] px-2 py-0.5 rounded-full shadow-sm border border-[#1976D2]/20 text-center">
                {rating}
            </span>
        </span>
    );
};

export default StarRating;