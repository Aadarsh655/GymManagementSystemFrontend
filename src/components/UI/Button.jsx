export default function Button(props) {
    const { label, className = '', onClick, type = 'button' } = props;
    return (
        <button type={type} onClick={onClick} className={`bg-primary text-white px-5 py-2 font-semibold uppercase hover:bg-primary-700 transition duration-200 ${className}`} >
            {label}
        </button>

    );
}