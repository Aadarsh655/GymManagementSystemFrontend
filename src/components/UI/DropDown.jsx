import React, { useState } from "react";

export function DropdownMenu({ onAsc, onDesc }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative inline-block">
      {/* Dropdown Trigger */}
      <button
        onClick={toggleDropdown}
        className="ml-2 cursor-pointer"
      >
        ⇅
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
          <button
            onClick={() => {
              onAsc(); // Trigger Ascending Sort
              closeDropdown(); // Close Dropdown
            }}
            className="block w-full px-4 py-2 text-left"
          >
            ▲ Asc
          </button>
          <button
            onClick={() => {
              onDesc(); // Trigger Descending Sort
              closeDropdown(); // Close Dropdown
            }}
            className="block w-full px-4 py-2 text-left"
          >
            ▼ Desc
          </button>
        </div>
      )}
    </div>
  );
}
export default DropdownMenu;