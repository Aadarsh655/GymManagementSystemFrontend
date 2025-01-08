import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';

const Input = React.forwardRef((props, ref) => (
  <input
    ref={ref}
    {...props}
    className={`pl-12 pr-4 py-2 w-full text-sm text-gray-900 placeholder-gray-300 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-lg focus:border-gray-300  ${props.className || ''}`}
  />
));

export default function Search() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="flex items-center mt-6">
      <div
        className={`relative flex-grow max-w-md ${
          searchFocused ? 'shadow-lg border-blue-500' : 'border-gray-300'
        } transition-all duration-200 ease-in-out`}
      >
        {/* Input Field */}
        <Input
          type="text"
          placeholder="Search by Name or Phone Number"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        
        {/* Search Icon */}
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
      </div>
    </div>
  );
}
