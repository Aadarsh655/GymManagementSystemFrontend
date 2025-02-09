import { useState,useEffect } from "react"
import Search from "@/layouts/Search"
import apiRequest from "@/api/axios";
import DataTable from "@/components/data-table/DataTable";
import UserRegistrationForm from "./UserRegistration";
import { Reply,Trash2 } from "lucide-react";
import { ActionButtons } from "../../components/UI/Button";
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
export default function Enquiry() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const[error,setError] = useState(null);
    const[data,setData] = useState([]);
    const[loading,setLoading]= useState(true);

    const fetchService = async()=>{
        try{
            const response = await apiRequest("enquiries","GET");
            setData(response);
        }
        catch(err){
            console.error("Failed to fetch users:", err.message);
            setError("Failed to load user data.");
        }finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        fetchService();
    },[]);
    const handleSubmit = async (formData) => {
        try {
            const response = await apiRequest(`enquiries/reply/${selectedRow.id}`,"POST" ,formData);
            if(response){
            toast.success('Reply submitted successfully!');
            console.log("API Response:", response);
            setError(null);
            setIsModalOpen(false);
            fetchService(); 
            }
    
        } catch (error) {
            if (error.response) {
            toast.error(error.response?.data?.message || 'An error occurred.');
        }
        else {
            toast.error(error.response.data?.message || "Something went wrong.");
    }}
    };
    
    const handleReply = () => {
        if (!selectedRow) {
            alert("Please select a row to edit.");
            return;
        }

        const formattedRow = { 
            comment:selectedRow.comment,
            reply: selectedRow.reply,
        };

        console.log("Formatted Row for Editing:", formattedRow);
        setSelectedRow(formattedRow);
        setIsModalOpen(true);
    };

    const columns=[ {accessorKey: "id", header: "Enquiry ID",},
        {accessorKey: "name",header: "Name",},
        {accessorKey: "email",header:"Email",},
        {accessorKey:"comment",header: "Comment"},
        {accessorKey:"created_at",header:"Enquiry Date",    cell: info => {
            const date = new Date(info.getValue());  // Get the date value
            return format(date, 'yyyy-MM-dd');  // Format the date to 'YYYY-MM-DD'
          }},
        {accessorKey:"reply",header: "Reply"}
    ]
    const replyFields = [
        {name:"comment",label:"Enquiry", disabled: selectedRow !==null},
        {name:"reply",label:"Reply"}
    ];
    return(
         <div className="h-screen ">
            <div className=" flex mt-3">
                <h1 className=" text-2xl w-full mt-4 font-semibold px-2 mb-4">Enquiries</h1>
                <ActionButtons
        actions={[
            {  onClick:handleReply,icon: Reply, text: "REPLY" },
            {  icon: Trash2, text: "DELETE" },
            ]}
        />
            </div>
                <Search /> 
                <DataTable columns={columns} data={data} setSelectedRow={setSelectedRow}/>
                {isModalOpen && (
                <UserRegistrationForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} 
                    apiEndpoint="enquiries" formFields={replyFields} initialValues={selectedRow} handleSubmit={handleSubmit}/>
            )}
            <ToastContainer /> 
        </div>
    )
}