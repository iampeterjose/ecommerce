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
        <div className="flex justify-start gap-2 my-2 text-customDark2">
            <span className='flex'>{stars}</span>
            <span className='text-sm'>{rating}</span>
        </div>
    );
};

export default StarRating;