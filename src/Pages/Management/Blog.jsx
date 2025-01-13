import { AddButton } from "@/components/UI/Button";
import { useState, useEffect } from "react";
import Search from "@/layouts/Search";
import DataTable from "@/components/data-table/DataTable";
import apiRequest from "@/api/axios";
export default function Blog(){
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user data from the API
        const fetchUsers = async () => {
            try {
                const response = await apiRequest("blog", "GET"); // Replace "users" with your API endpoint
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

    const columns = [
        {
            accessorKey: "id",
            header: "Blog I.D.",
        },
        {
            accessorKey: "image",
            header: "Image",
            enableSorting: false,
            cell: (info) => (
                <img
                    src={info.row.original.image_url || "/default-avatar.png"} // Replace with default image if null
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
            ),
        },
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "slug",
            header: "Slug",
        },
    ];
    return(
        <div className="h-screen">
            <h1 className="text-2xl sticky font-bold mb-4">Blogs</h1>
            <AddButton onClick={() => setIsModalOpen(true)}/>
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
          />
        )}
   
        </div>
    )
}