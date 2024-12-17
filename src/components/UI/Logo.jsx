import { FaDumbbell } from "react-icons/fa6";
import { Link } from 'react-router-dom';
export default function Logo() {
    return (
        <div className="flex items-center">
            <Link to="/home"

                className="flex items-center gap-2 font-extrabold text-xl uppercase tracking-wide text-gray-800 hover:text-gray-900"
            >
                <FaDumbbell className="text-2xl text-primary" />
                Hercules <span className="text-primary">GYM</span>
            </Link>
        </div>
    );
}
