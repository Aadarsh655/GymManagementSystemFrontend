import React, { useState } from 'react'

const Table = ({ 
  columns = [], 
  data = [],
  itemsPerPage = 25,
  searchPlaceholder = "Search by Student Name, Registration/Symbol Number",
  totalItems = 648
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  
  const safeData = data || []
  
  const filteredData = safeData.filter(item => 
    Object.values(item || {}).some(value => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return (
    <div className="shadow-xl bg-white p-[10px] mt-1 items-center justify-between">

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="bg-secondary text-black border-b border-gray-200">
        {columns.map((column, index) => (
          <th
            key={index}
            className="px-6 py-3 text-left text-sm font-medium text-primary" // Reduced `py-6` to `py-3`
          >
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {data.map((row, rowIndex) => (
        <tr key={rowIndex} className="hover:bg-gray-50">
          {columns.map((column, colIndex) => (
            <td
              key={colIndex}
              className="px-6 py-2 text-sm text-gray-900 whitespace-nowrap" // Reduced `py-6` to `py-3`
            >
              {column.render ? column.render(row) : row[column.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>


<div className="flex flex-col sm:flex-row items-center justify-between px-6 border-t border-gray-200 bg-white">
  {/* Pagination Info */}
  <div className="text-sm text-gray-600 sm:order-1 order-2">
    {`${startIndex + 1}-${Math.min(endIndex, totalItems)} of ${totalItems}`}
  </div>

  {/* Pagination Controls */}
  <div className="flex items-center gap-2 sm:order-2 order-1 justify-center flex-1">
    {/* First Page Button */}
    <button
      onClick={() => setCurrentPage(1)}
      disabled={currentPage === 1}
      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
    >
      {'<<'}
    </button>

    {/* Previous Page Button */}
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
    >
      {'<'}
    </button>

    {/* Page Numbers */}
    <div className="flex items-center gap-1">
      {[...Array(Math.min(5, totalPages))].map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            currentPage === i + 1
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
    <span className="px-2">...</span>

    {/* Last Page Shortcut */}
    <button
      onClick={() => setCurrentPage(totalPages)}
      className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
    >
      {totalPages}
    </button>

    {/* Next Page Button */}
    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
    >
      {'>'}
    </button>

    {/* Last Page Button */}
    <button
      onClick={() => setCurrentPage(totalPages)}
      disabled={currentPage === totalPages}
      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
    >
      {'>>'}
    </button>
  </div>

  {/* Jump To Dropdown */}
  <div className="flex items-center ml-4 gap-2 sm:order-3 order-3">
    <span className="text-sm text-gray-600">Jump To:</span>
    <select
      className="w-20 p-2 text-sm border border-gray-200 rounded-lg"
      value={currentPage}
      onChange={(e) => setCurrentPage(Number(e.target.value))}
    >
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <option key={page} value={page}>
          {page}
        </option>
      ))}
    </select>
  </div>
</div>

</div>

      </div>
    
  )
}

export default Table

