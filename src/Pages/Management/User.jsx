import { useState, useEffect } from "react";
import DataTable from "@/components/data-table/DataTable";
import Search from "../../layouts/Search";
import UserRegistrationForm from "./UserRegistration";
import apiRequest from "@/api/axios"; // Replace with your API request function
import { IoAddCircleSharp } from "react-icons/io5";
import {AddButton} from "../../components/UI/Button"
import avatorImg from "../../assets/avator.png"
export default function User() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]); // State to store user data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch user data from the API
        const fetchUsers = async () => {
            try {
                const response = await apiRequest("user", "GET"); // Replace "users" with your API endpoint
                setData(response); // Assuming the API returns an array of users
            } catch (err) {
                console.error("Failed to fetch users:", err.message);
                setError("Failed to load user data.");
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (row) => {
        console.log("Edit action triggered for:", row);
        // Add your edit logic here
    };

    const handleDelete = (row) => {
        console.log("Delete action triggered for:", row);
        // Add your delete logic here
    };
        const formFields = [
        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter full name', required: true },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email address', required: true },
        { name: 'role', label: 'Role', type: 'select', placeholder: 'Select role', required: true, options: [
            { value: 'Member', label: 'Member' },
            { value: 'Admin', label: 'Admin' },
        ] },
        { image: 'image', label: 'Profile Photo', type: 'file', accept: 'image/*' },
    ];

    const columns = [
        {
            accessorKey: "id",
            header: "Member I.D.",
        },
        {
            accessorKey: "image",
            header: "Image",
            enableSorting: false,
            cell: (info) => (
                <img
                src={info.row.original.image_url || avatorImg} // Replace with default image if null
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                />
            ),
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
    ];

    return (
        <div className="h-screen ">
            <div className=" flex">

        <h1 className=" text-2xl w-full mt-8 font-semibold px-2 mb-4">User List</h1>
          <AddButton onClick={() => setIsModalOpen(true)}  />
            </div>
          <Search />
         
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
        {isModalOpen && (
        <UserRegistrationForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    apiEndpoint="register"
                    formFields={formFields}
          />
        )}
      </div>
    );
}


