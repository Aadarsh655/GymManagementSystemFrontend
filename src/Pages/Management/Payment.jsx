import { AddButton } from "@/components/UI/Button"
import Search from "@/layouts/Search"
import DataTable from "@/components/data-table/DataTable"
export default function Payments(){

const columns =[
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "membership_name",
        header: "Membership",
    },
    {
        accessorKey: "amount",
        header: "Total",
    },
    {
        accessorKey: "discount",
        header: "Discount",
    },
    {
        accessorKey: "paid_amount",
        header: "Paid",
    },
    {
        accessorKey: "due",
        header: "Due",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "paid_date",
        header: "Payment Date",
    },
    {
        accessorKey: "expire_date",
        header: "Expire Date",
    }
];

const data = [
    { name: "John Doe", membership_name: "Gold", amount: 4500, discount: 300, paid_amount: 4200, due: 0, status: "Paid", paid_date: "2025-01-01", expire_date: "2025-07-01" },
    { name: "Jane Smith", membership_name: "Silver", amount: 3200, discount: 200, paid_amount: 3000, due: 0, status: "Paid", paid_date: "2025-01-05", expire_date: "2025-07-05" },
    { name: "Alice Johnson", membership_name: "Basic", amount: 1500, discount: 100, paid_amount: 1200, due: 300, status: "Partial", paid_date: "2025-01-10", expire_date: "2025-07-10" },
    { name: "Robert Brown", membership_name: "Platinum", amount: 5000, discount: 500, paid_amount: 4500, due: 0, status: "Paid", paid_date: "2025-01-15", expire_date: "2025-07-15" },
    { name: "Emily Davis", membership_name: "Gold", amount: 3800, discount: 300, paid_amount: 3500, due: 0, status: "Paid", paid_date: "2025-01-20", expire_date: "2025-07-20" },
];

    
    return(
        <div className="h-screen ">
        <div className=" flex">

    <h1 className=" text-2xl w-full mt-8 font-semibold px-2 mb-4">Payments</h1>
      <AddButton  />
        </div>
      <Search />
      <DataTable columns={columns} data={data}/>
  </div>
    )}