export default function Input(props){
        const{ type='text',className='', placeholder='',onChange,value}=props;
    return(
            <input 
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full bg-black text-gray-100 placeholder-gray-500 border border-gray-700 rounded-md py-2 px-4 focus:outline-none h-12 focus:ring-2 focus:ring-primary ${className}`}
            />
    );
}