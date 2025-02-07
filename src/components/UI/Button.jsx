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


export function AddButton({ onClick, icon: Icon, text }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex gap-1 text-primary p-2 rounded-md font-medium items-center transition duration-200"
    >
      <Icon className="size-5 text-primary" />
      {text}
    </button>
  );
}

export function ActionButtons({ actions }) {
  return (
    <div className="flex gap-2">
      {actions.map(({ onClick, icon, text }, index) => (
        <AddButton key={index} onClick={onClick} icon={icon} text={text} />
      ))}
    </div>
  );
}




