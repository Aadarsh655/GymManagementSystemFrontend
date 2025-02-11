import { useState, useEffect } from "react";
import DataTable from "@/components/data-table/DataTable";
import Search from "../../layouts/Search";
import UserRegistrationForm from "./UserRegistration";
import apiRequest from "@/api/axios"; // Replace with your API request function
import {AddButton} from "../../components/UI/Button"
import avatorImg from "../../assets/avator.png"
import { CirclePlus, FilePenLine, Trash2, Archive } from "lucide-react";
import { ActionButtons } from "../../components/UI/Button";
import { ToastContainer, toast } from 'react-toastify';

 function User() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
      };
    
      const filteredData = searchQuery
      ? data.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data;
    useEffect(() => {
        fetchUsers();
    }, []);
    
    const fetchUsers = async () => {
        try {
            const response = await apiRequest("user", "GET"); 
            const formattedUsers = response.map(user => ({
                ...user,
                image_url: user.image ? `http://localhost:8000/storage/${user.image}` : avatorImg, 
            }));
            setData(formattedUsers);
        } catch (err) {
            console.error("Failed to fetch users:", err.message);
            setError("Failed to load user data.");
        } finally {
            setLoading(false);
        }
    };
    

    const handleAdd = () => {
    setSelectedRow(null); 
    setIsModalOpen(true); 
};

const handleEdit = () => {
    if (!selectedRow) {
        alert("Please select a row to edit.");
        return;
    }
    console.log("Selected Row for Edit:", selectedRow);

    const formattedRow = {
        id: selectedRow.id,
        name: selectedRow.name,
        email: selectedRow.email,
        age: selectedRow.age,
        blood_group: selectedRow.blood_group,
        gender: selectedRow.gender,
        role: selectedRow.role,
        image: selectedRow.image,
        imagePreview: selectedRow.image_url || avatorImg,
    };

    setSelectedRow(formattedRow);
    setIsModalOpen(true);
};

const handleSubmit = async (formData, setError, setIsModalOpen) => {
    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
        if (key === "image" && value) {
            formDataToSend.append("image", value);
        } else {
            formDataToSend.append(key, value);
        }
    }

    try {
        let response;
        if (selectedRow?.id) {
            if (!formData.image) {
                formDataToSend.delete("image"); s
            }
            console.log("Form Data Sent:", Object.fromEntries(formDataToSend));

            response = await apiRequest(`register/${selectedRow.id}`, "POST", formDataToSend);

        } else {
            response = await apiRequest("register", "POST", formDataToSend);
            if(response)
                toast.success('User registered successfully!');
        }
        console.log("API Response:", response);
        setError(null);
        setIsModalOpen(false);
        
        fetchUsers(); 
        setData((prevData) => [...prevData]);
    } catch (error) {
        setError(error.response?.data?.message || "An error occurred.");
    }
};



    const handleDelete = (row) => {
        console.log("Delete action triggered for:", row);
    };
        const formFields = [
        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter full name', required: true },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email address', required: true },
        {name: "age", label:"Age", type: "number", placeholder:"Enter your age", required: true},
        {
            name: "blood_group",
            label: "Blood Group",
            type: "select",
            options: [
              { value: "A+", label: "A+" },
              { value: "A-", label: "A-" },
              { value: "B+", label: "B+" },
              { value: "B-", label: "B-" },
              { value: "AB+", label: "AB+" },
              { value: "AB-", label: "AB-" },
              { value: "O+", label: "O+" },
              { value: "O-", label: "O-" }
            ],
            placeholder: "Select your blood group",
            required: true
          },
          {name:"gender",label:"Gender", type:"select", options:[{value:"Male",label:"Male"},{value:"Female", label: "Female"}], placeholder:"Select your gender", required: true},
          
        { name: 'role', label: 'Role', type: 'select', placeholder: 'Select role', required: true, options: [
            { value: 'Member', label: 'Member' },
            { value: 'Admin', label: 'Admin' },
        ] },
        { name: 'image', label: 'Profile Photo', type: 'file', accept: 'image/*' },
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
                src={info.row.original.image_url || avatorImg} 
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
            accessorKey: "age",
            header: "Age",
        },
        {
            accessorKey:"gender",
            header: "Gender",
        },
        {
            accessorKey:"blood_group",
            header:"Blood Group",
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
            <div className=" flex mt-3">

        <h1 className=" text-2xl w-full mt-4 font-semibold px-2 mb-4">User List</h1>
        <div className=" flex gap-1">
        <ActionButtons
        actions={[
            { onClick: handleAdd, icon: CirclePlus, text: "ADD" },
            { onClick: handleEdit, icon: FilePenLine, text: "EDIT" },
            { onClick: handleDelete, icon: Trash2, text: "DELETE" },
            { icon: Archive, text: "ARCHIVE" }
            ]}
        />
          </div>
            </div>
            <Search onSearch={handleSearch} />
         
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <DataTable columns={columns} data={filteredData} setSelectedRow={setSelectedRow} />
        )}
        {isModalOpen && (
        <UserRegistrationForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    apiEndpoint="register"
                    formFields={formFields}
                    initialValues={selectedRow}
                    handleSubmit={handleSubmit}
          />
        )}
        <ToastContainer position ="top-right" className=" min-h-[130px] p-4 text-lg" /> 
      </div>
    );
}


export default User;