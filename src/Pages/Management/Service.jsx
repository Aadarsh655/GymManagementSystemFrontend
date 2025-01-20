import { useState,useEffect } from "react"
import { AddButton } from "@/components/UI/Button"
import Search from "@/layouts/Search"
import apiRequest from "@/api/axios";
import DataTable from "@/components/data-table/DataTable";
export function Service(){
    const[error,setError] = useState(null);
    const[data,setData] = useState([]);
    const[loading,setLoading]= useState(true);

    useEffect(()=>{
        const fetchService = async()=>{
            try{
                const response = await apiRequest("membership","GET");
                setData(response);
            }
            catch(err){
                console.error("Failed to fetch users:", err.message);
                setError("Failed to load user data.");
            }finally{
                setLoading(false);
            }
        };
        fetchService();
    },[]);
    const columns=[
        {
            accessorKey: "membership_id",
            header: "Membership I.D.",
        },
        {
            accessorKey: "membership_name",
            header: "Membership Name",
        },
        {
            accessorKey: "price",
            header:"Price",
        },
        {
            accessorKey:"facilities",
            header: "Facilities"
        },
        {
            accessorKey:"status",
            header: "Status"
        }
    ]
    return(
         <div className="h-screen ">
            <div className=" flex">
                <h1 className=" text-2xl w-full mt-8 font-semibold px-2 mb-4">Service List</h1>
                  <AddButton onClick={() => setIsModalOpen(true)}  />
            </div>
                <Search /> 
                <DataTable columns={columns} data={data} />
        </div>
    )
}