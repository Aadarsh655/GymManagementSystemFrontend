import React, { useState } from "react";
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

  const handleSelectAll = (isChecked) => {
    const newSelectedRows = {};
    if (isChecked) {
      data.forEach((row, index) => {
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

  // Checkbox column for selecting rows
  const checkboxColumn = {
    accessorKey: "checkbox",
    header: ({ table }) => (
      <input
        type="checkbox"
        onChange={(e) => handleSelectAll(e.target.checked)}
        checked={
          Object.keys(selectedRows).length === data.length &&
          data.length > 0 // Ensure data exists
        }
         className="w-4 h-4 accent-primary cursor-pointer"
        title="Select All"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        onChange={(e) =>
          handleRowSelect(row.index, e.target.checked)
        }
        checked={!!selectedRows[row.index]}
        className="w-4 h-4 accent-red-500 cursor-pointer"
        title="Select Row"
      />
    ),
    enableSorting: false,
  };

  // Action column for Edit and Delete
  const actionColumn = {
    accessorKey: "action",
    header: "Action",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex gap-4 text-blue-600">
        {/* Edit Icon */}
        <div className="flex gap-2 cursor-pointer">
          <FaEdit
            className="text-blue-600 text-lg"
            onClick={() => onEdit && onEdit(row.original)}
          />
          <span>Edit</span>
        </div>

        {/* Delete Icon */}
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
    data,
    columns: [checkboxColumn, ...columns, actionColumn], // Add Checkbox and Action columns
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // Enable sorting
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
                    {/* Simple Dropdown Menu for Sorting */}
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
    </div>
  );
}

export default DataTable;
