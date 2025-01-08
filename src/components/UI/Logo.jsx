import { FaDumbbell } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Logo(props) {
    const {
        className = "",
        text = "Hercules GYM",
        iconClassName = "text-2xl text-primary",
        textClassName = "text-xl",
    } = props;

    return (
        <div className={`flex items-center ${className}`}>
            <Link
              
                className={`flex items-center gap-2 font-extrabold uppercase tracking-wide text-gray-800 hover:text-gray-900 ${textClassName}`}
            >
                <FaDumbbell className={iconClassName} />
                {text.split(" ")[0]}{" "}
                <span className="text-primary">{text.split(" ")[1]}</span>
            </Link>
        </div>
    );
}
