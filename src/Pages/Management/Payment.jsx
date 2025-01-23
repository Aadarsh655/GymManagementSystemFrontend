import { AddButton } from "@/components/UI/Button"
import Search from "@/layouts/Search"
import DataTable from "@/components/data-table/DataTable"
import apiRequest from "@/api/axios";
import { useState,useEffect } from "react";
export default function Payments(){
    // const[isModalOpen,setIsModalOpen] = useState(false);
    const[data,setData] = useState([]);
    const[error,setError] = useState(null);
    const[loading,setLoading] = useState(true);

   
      

const columns =[
    {
        accessorKey: "user_name",
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
        accessorKey: "due_amount",
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

useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await apiRequest("payments", "GET");
        console.log("API Response:", response); // Debug the API response
  
        // Extract the array from the response and set it as data
        setData(response.payments || []);
      } catch (err) {
        console.error("Failed to fetch payments:", err.message);
        setError("Failed to load payment data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();
  }, []);
  


    return(
        <div className="h-screen ">
        <div className=" flex">

    <h1 className=" text-2xl w-full mt-8 font-semibold px-2 mb-4">Payments</h1>
      <AddButton  />
        </div>
      <Search />
          <DataTable columns={columns} data={data} />
  </div>
    )}