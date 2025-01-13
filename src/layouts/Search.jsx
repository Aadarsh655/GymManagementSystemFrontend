import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';

const Input = React.forwardRef((props, ref) => (
  <input
    ref={ref}
    {...props}
    className={`pl-10 pr-4 py-2 w-full text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent ${props.className || ''}`}
  />
));

Input.displayName = 'Input';

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-700 focus:outline-none"
  >
    {children}
  </button>
);

export default function Search() {
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search button clicked');
  };

  return (
    <div className="flex items-center justify-between mt-2 mb-2 space-x-4">
      <div className="relative flex-grow">
        {/* Input Field */}
        <Input
          type="text"
          placeholder="Search by Name or Phone Number"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        
        {/* Search Icon */}
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
      
      {/* Search Button */}
      <Button type="button" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}

