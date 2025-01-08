import { useState } from "react";
import DataTable from "@/components/data-table/DataTable";
import Search from "../../layouts/Search";
import UserRegistrationForm from "./UserRegistration";
// import Button from "../../components/UI/Button"
const data = [
    { name: "Aadarsh Bikram Shah" , img:"img",email: 'john@example.com', role: 'Admin', status: 'Active' },
    { name: "Bishnu prasad" , img:"img",email: 'zzzz@example.com', role: 'Member', status: 'INActive' },

];
export default function User() {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const columns = [
        {
            accessorKey: "S.N.",
            header: "S.N.",
            enableSorting: false,
          },
          {
            accessorKey: "membaerID",
            header: "Member I.D.",
          },

        {
          accessorKey: "img",
          header: "Image",
          enableSorting: false,
        },
        {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "email",
            header: "Email",
          },
          {
            accessorKey: "role",
            header: "Role",
          },
        {
            accessorKey: "status",
            header: "Status",
          },
          {
            accessorKey: "action",
            header: "Action",
            enableSorting: false,
          },
    ]
    return (
        <div>
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <div className="w-full flex justify-end">
        <button className="text-primary bg-secondary border border-primary px-5 py-1 rounded-md font-medium items-end transition duration-200"
         onClick={() => setIsModalOpen(true)}
      >
            ADD
        </button>
        </div>
        <Search />
        <DataTable columns={columns} data={data}/>
        {isModalOpen && (
                <UserRegistrationForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            )}
        </div>
    );
}
