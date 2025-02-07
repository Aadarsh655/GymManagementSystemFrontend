import React, { useState, useMemo, useEffect } from "react";
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

export function DataTable({ columns, data, setSelectedRow, handleEdit }) {
  const [selectedRowIndexes, setSelectedRowIndexes] = useState({});
  const [sorting, setSorting] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, pageIndex, pageSize]);

  useEffect(() => {
    const selectedRows = Object.keys(selectedRowIndexes).map((index) => paginatedData[index]);
    
    if (selectedRows.length === 1) {
      setSelectedRow(selectedRows[0]);
    } else {
      setSelectedRow(null);
    }
  }, [selectedRowIndexes, paginatedData, setSelectedRow]);

  const handleSelectAll = (isChecked) => {
    const newSelectedRows = {};
    if (isChecked) {
      paginatedData.forEach((_, index) => {
        newSelectedRows[index] = true;
      });
    }
    setSelectedRowIndexes(newSelectedRows);
  };

  const handleRowSelect = (index, isChecked) => {
    setSelectedRowIndexes((prev) => {
      const newSelectedRows = { ...prev };
      if (isChecked) {
        newSelectedRows[index] = true;
      } else {
        delete newSelectedRows[index];
      }
      return newSelectedRows;
    });
  };

  const checkboxColumn = {
    accessorKey: "checkbox",
    header: () => (
      <input
        type="checkbox"
        onChange={(e) => handleSelectAll(e.target.checked)}
        checked={
          Object.keys(selectedRowIndexes).length === paginatedData.length &&
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
        checked={!!selectedRowIndexes[row.index]}
        className="w-4 h-4 accent-red-500 cursor-pointer"
        title="Select Row"
      />
    ),
    enableSorting: false,
  };

  const table = useReactTable({
    data: paginatedData,
    columns: [checkboxColumn, ...columns],
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleEditClick = () => {
    const selectedRowsCount = Object.keys(selectedRowIndexes).length;

    if (selectedRowsCount === 0) {
      alert("Please select a row to edit.");
      return;
    }

    if (selectedRowsCount > 1) {
      alert("Only one row can be selected for editing.");
      return;
    }

    // Proceed with editing the selected row
    handleEdit();
  };

  return (
    <div className="flex flex-col h-[70%]">
      <div className="flex-grow overflow-auto rounded-md border bg-white">
        <Table className="h-full">
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.index}
                  className={selectedRowIndexes[row.index] ? "bg-gray-50" : ""}
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
      <div className="flex justify-between bg-white rounded-lg border items-center p-4 mt-4">
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

