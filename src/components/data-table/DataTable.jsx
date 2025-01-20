
import React, { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DropdownMenu } from "../UI/DropDown";
import { FaEdit, FaTrash } from "react-icons/fa";

export function DataTable({ columns, data, onEdit, onDelete }) {
  const [sorting, setSorting] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [pageIndex, setPageIndex] = useState(0); // Current page index
  const [pageSize, setPageSize] = useState(10); // Rows per page

  // Slice data for current page
  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, pageIndex, pageSize]);

  const handleSelectAll = (isChecked) => {
    const newSelectedRows = {};
    if (isChecked) {
      paginatedData.forEach((row, index) => {
        newSelectedRows[index] = true;
      });
    }
    setSelectedRows(newSelectedRows);
  };

  const handleRowSelect = (index, isChecked) => {
    setSelectedRows((prev) => ({
      ...prev,
      [index]: isChecked,
    }));
  };

  const checkboxColumn = {
    accessorKey: "checkbox",
    header: ({ table }) => (
      <input
        type="checkbox"
        onChange={(e) => handleSelectAll(e.target.checked)}
        checked={
          Object.keys(selectedRows).length === paginatedData.length &&
          paginatedData.length > 0
        }
        className="w-4 h-4 accent-primary cursor-pointer"
        title="Select All"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        onChange={(e) => handleRowSelect(row.index, e.target.checked)}
        checked={!!selectedRows[row.index]}
        className="w-4 h-4 accent-red-500 cursor-pointer"
        title="Select Row"
      />
    ),
    enableSorting: false,
  };

  const actionColumn = {
    accessorKey: "action",
    header: "Action",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex gap-4 text-blue-600">
        <div className="flex gap-2 cursor-pointer">
          <FaEdit
            className="text-blue-600 text-lg"
            onClick={() => onEdit && onEdit(row.original)}
          />
          <span>Edit</span>
        </div>
        <div className="flex gap-2 text-primary cursor-pointer">
          <FaTrash
            className="text-lg"
            onClick={() => onDelete && onDelete(row.original)}
          />
          <span>Delete</span>
        </div>
      </div>
    ),
  };

  const table = useReactTable({
    data: paginatedData, // Pass paginated data here
    columns: [checkboxColumn, ...columns, actionColumn],
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <div className="flex items-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() && (
                      <DropdownMenu
                        onAsc={() =>
                          table.setSorting([{ id: header.column.id, desc: false }])
                        }
                        onDesc={() =>
                          table.setSorting([{ id: header.column.id, desc: true }])
                        }
                      />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 2} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      <div className="flex justify-between bg-white rounded-lg border items-center p-4">
        <button
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
        >
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
          onClick={() =>
            setPageIndex((prev) =>
              Math.min(prev + 1, Math.ceil(data.length / pageSize) - 1)
            )
          }
          disabled={pageIndex >= Math.ceil(data.length / pageSize) - 1}
        >
          Next
        </button>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="ml-4 border rounded px-2 py-1"
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DataTable;
