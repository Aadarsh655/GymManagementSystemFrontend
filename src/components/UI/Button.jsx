import { IoAddCircleSharp } from "react-icons/io5";
export default function Button(props) {
    const { label, className = '', onClick, type = 'button', disabled = false } = props;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`bg-primary text-white px-5 py-2 font-semibold uppercase 
                hover:bg-primary-700 transition duration-200 
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {label}
        </button>
    );
}





export function AddButton({ onClick }) {
  return (
    <div className="w-full flex justify-end">
      <button
        type="button"
        onClick={onClick} // onClick is passed as a prop
        className="mt-6 mb-2 flex gap-2 py-1 text-primary bg-secondary border border-primary px-2 rounded-md font-medium items-center transition duration-200"
      >
        <IoAddCircleSharp className="size-6 text-primary" />
        ADD
      </button>
    </div>
  );
}




