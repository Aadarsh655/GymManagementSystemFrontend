export default function Input(props) {
        const { type = 'text', className = '', placeholder = '', onChange, value, name } = props;
        
        return (
          <input 
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            name={name}  // Ensure name is passed down to each input field
            className={`w-full text-white bg-black placeholder-gray-400 border focus:border-none border-gray-300 rounded-md py-2 px-4 focus:outline-none h-12 focus:ring-2 focus:ring-gray-200 ${className}`}
          />
        );
      }
      