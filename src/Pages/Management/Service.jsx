import { useState, useEffect } from "react";
import Search from "@/layouts/Search";
import apiRequest from "@/api/axios";
import DataTable from "@/components/data-table/DataTable";
import UserRegistrationForm from "./UserRegistration";
import { CirclePlus, FilePenLine, Trash2, Archive } from "lucide-react";
import { ActionButtons } from "../../components/UI/Button";

export function Service() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch Membership Services
    const fetchService = async () => {
        try {
            const response = await apiRequest("membership", "GET");
            setData(response);
        } catch (err) {
            console.error("Failed to fetch services:", err.message);
            setError("Failed to load service data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchService();
    }, []);
    const handleSearch = (query) => {
        setSearchQuery(query);
      };
    
      const filteredData = searchQuery
      ? data.filter((service) =>
          service.membership_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.facilities.some(facility =>
              facility.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
      : data;
    // Handle Form Submission (Add / Edit)
    const handleSubmit = async (formData, setError, setIsModalOpen) => {
        try {
            let formattedData = {
                ...formData,
                facilities: formData.facilities 
                    ? formData.facilities.split(",").map(item => item.trim()) 
                    : [], // Convert to array or use empty array
            };
    
            let response;
            if (selectedRow?.membership_id) {
                // Update existing package
                response = await apiRequest(`membership/${selectedRow.membership_id}`, "PATCH", formattedData);
            } else {
                // Create new package
                response = await apiRequest("membership", "POST", formattedData);
            }
    
            console.log("API Response:", response);
            setError(null);
            setIsModalOpen(false);
            fetchService(); // Refresh data
    
        } catch (error) {
            console.error("Error submitting:", error);
            setError(error.response?.data?.message || "An error occurred.");
        }
    };
    

    // Open Form for Adding a New Package
    const handleAdd = () => {
        setSelectedRow(null);
        setIsModalOpen(true);
    };

    // Open Form for Editing an Existing Package
    const handleEdit = () => {
        if (!selectedRow) {
            alert("Please select a package to edit.");
            return;
        }
    
        // Ensure facilities is an array
        const formattedRow = {
            membership_id: selectedRow.membership_id,
            membership_name: selectedRow.membership_name,
            price: selectedRow.price,
            facilities: Array.isArray(selectedRow.facilities) 
                ? selectedRow.facilities.join(", ") // Convert array to string for input
                : selectedRow.facilities || "", // Handle cases where facilities is undefined
            status: selectedRow.status,
        };
    
        console.log("Formatted Row for Editing:", formattedRow);
    
        setSelectedRow(formattedRow);
        setIsModalOpen(true);
    };
    

    const serviceFormFields = [
        { name: "membership_name", label: "Package Name", type: "text", required: true },
        { name: "price", label: "Price", type: "number", required: true },
        { name: "facilities", label: "Facilities", type: "array", required: true }, // Handle array properly in form
        {
            name: "status",
            label: "Status",
            type: "select",
            options: [
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" }
            ],
            placeholder: "Select status",
            required: true
        }
    ];

    const columns = [
        { accessorKey: "membership_id", header: "Membership I.D." },
        { accessorKey: "membership_name", header: "Membership Name" },
        { accessorKey: "price", header: "Price" },
        { accessorKey: "facilities", header: "Facilities" },
        { accessorKey: "status", header: "Status" }
    ];

    return (
        <div className="h-screen">
            <div className="flex mt-3">
                <h1 className="text-2xl w-full mt-4 font-semibold px-2 mb-4">Service List</h1>
                <ActionButtons
                    actions={[
                        { onClick: handleAdd, icon: CirclePlus, text: "ADD" },
                        { onClick: handleEdit, icon: FilePenLine, text: "EDIT" },
                        { icon: Trash2, text: "DELETE" },
                        { icon: Archive, text: "ARCHIVE" }
                    ]}
                />
            </div>

            <Search onSearch={handleSearch}/>
            <DataTable columns={columns} data={filteredData} setSelectedRow={setSelectedRow} />

            {isModalOpen && (
                <UserRegistrationForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    apiEndpoint="membership"
                    formFields={serviceFormFields}
                    initialValues={selectedRow || { facilities: [] }} // Ensure facilities is initialized as an array
                    formTitle={selectedRow ? "Edit Package" : "Add Package"}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
}
