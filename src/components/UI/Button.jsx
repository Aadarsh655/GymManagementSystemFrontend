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
