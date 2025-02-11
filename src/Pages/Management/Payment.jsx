import Search from "@/layouts/Search";
import DataTable from "@/components/data-table/DataTable";
import apiRequest from "@/api/axios";
import { useState, useEffect } from "react";
import { CirclePlus, FilePenLine, Trash2, Archive } from "lucide-react";
import { ActionButtons } from "../../components/UI/Button";
import UserRegistrationForm from "./UserRegistration";
import { ToastContainer, toast } from 'react-toastify';
export default function Payments() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAmount, setShowAmount] = useState(false);
    const [membershipPrice, setMembershipPrice] = useState(0);
    const [formData, setFormData] = useState({});
    const [searchQuery,setSearchQuery] = useState("");

    const columns = [
        { accessorKey: "user_name", header: "Name" },
        { accessorKey: "membership_name", header: "Membership" },
        { accessorKey: "amount", header: "Total" },
        { accessorKey: "discount", header: "Discount" },
        { accessorKey: "paid_amount", header: "Paid" },
        { accessorKey: "due_amount", header: "Due" },
        { accessorKey: "status", header: "Status" },
        { accessorKey: "paid_date", header: "Payment Date" },
        { accessorKey: "expire_date", header: "Expire Date" }
    ];

    // ✅ Handle Adding New Payment
    const handleAdd = () => {
        setSelectedRow(null);
        setShowAmount(false);
        setMembershipPrice(0);
        setIsModalOpen(true);
    };

    // ✅ Handle Editing Existing Payment
    const handleEdit = () => {
        if (!selectedRow) {
            toast.warning("Please select a row to edit.");
            return;
        }

        const formattedRow = {
            payment_id: selectedRow.payment_id,
            user_id:selectedRow.user_id,
            user_name: selectedRow.user_name,
            membership_id: selectedRow.membership_id,
            amount: selectedRow.amount,
            discount: selectedRow.discount || 0,
            paid_amount: selectedRow.paid_amount,
            due_amount: selectedRow.due_amount,
            paid_date: selectedRow.paid_date,
            expire_date: selectedRow.expire_date
        };

        console.log("Formatted Row for Editing:", formattedRow);
        setSelectedRow(formattedRow);
        setShowAmount(true);
        setMembershipPrice(selectedRow.amount);
        setIsModalOpen(true);
    };

    // ✅ Fetch Membership Price Based on ID
   
    
    // Fetch Membership Price Based on `membership_id`
    const fetchMembershipPrice = async (membership_id) => {
        if (!membership_id) return;
    
        try {
            const response = await apiRequest(`memberships/${membership_id}`, "GET");
            
            if (response && response.price) {
                setMembershipPrice(response.price);
                
                // ✅ Update form data to reflect correct price
                setFormData((prevData) => ({
                    ...prevData,
                    amount: response.price, // ✅ Set total amount based on membership
                    due_amount: response.price - (prevData.discount || 0) - (prevData.paid_amount || 0) // ✅ Auto-calculate due
                }));
            }
        } catch (error) {
            console.error("Failed to fetch membership price:", error.message);
            setMembershipPrice(0);
        }
    };
    
    // ✅ Handle Input Change and Auto-Calculate Due Amount
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prevData) => {
            let newData = { ...prevData, [name]: value };
    
            // ✅ If Membership ID is changed, fetch the amount
            if (name === "membership_id") {
                fetchMembershipPrice(value);
            }
    
            // ✅ Auto-calculate Due Amount
            if (["discount", "paid_amount"].includes(name)) {
                newData.due_amount = (membershipPrice || 0) - (newData.discount || 0) - (newData.paid_amount || 0);
            }
    
            return newData;
        });
    };
    const paymentFormFields = [
        { name: "user_id", label: "User ID", type: "number", required: true, disabled: selectedRow !==null },
        { name: "membership_id", label: "Membership ID", type: "number", required: true, onChange: handleInputChange },
        { name: "discount", label: "Discount", type: "number", required: false, onChange: handleInputChange },
        { name: "paid_amount", label: "Paid Amount", type: "number", required: true, onChange: handleInputChange },
        { name: "paid_date", label: "Paid Date", type: "date", required: true },
        { name: "expire_date", label: "Expiry Date", type: "date", required: true }
    ];

    useEffect(() => {
        fetchPayments();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
      };
    
      const filteredData = searchQuery
      ? data.filter((payment) =>
          payment.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||         
              payment.paid_date.toLowerCase().includes(searchQuery.toLowerCase())
          
      )
      : data;

    const fetchPayments = async () => {
        try {
            const response = await apiRequest("payments", "GET");
            console.log("API Response:", response);

            const formattedData = response.payments.map(payment => ({
                payment_id: payment.payment_id,
                user_id: payment.user_id,
                user_name: payment.user_name,
                membership_id: payment.membership_id,
                membership_name: payment.membership_name,
                amount: payment.amount,
                discount: payment.discount || 0,
                paid_amount: payment.paid_amount,
                due_amount: payment.due_amount,
                status: payment.status,
                paid_date: payment.paid_date,
                expire_date: payment.expire_date
            }));

            setData(formattedData);
        } catch (err) {
            console.error("Failed to fetch payments:", err.message);
            setError("Failed to load payment data.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Handle Form Submission (ADD & EDIT PAYMENT API)
    const handleSubmit = async (formData, setError, setIsModalOpen) => {
        try {
            let response;

            if (selectedRow?.payment_id) {  
                response = await apiRequest(`payments/${selectedRow.payment_id}`, "PATCH", formData);
                if(response)
                    toast.success("Payment edited successfully!")
            } 
            else {
                response = await apiRequest("payments", "POST", formData);
                if(response)
                    toast.success('Payment for the user added successfully!');
            }

            console.log("API Response:", response);
            setError(null);
            setIsModalOpen(false);
            fetchPayments();

        } catch (error) {
            setError(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="h-screen">
            <div className="mt-3 flex">
                <h1 className="text-2xl w-full mt-4 font-semibold px-2 mb-4">Payments</h1>
                <ActionButtons actions={[
                        { onClick: handleAdd, icon: CirclePlus, text: "ADD" },
                        { onClick: handleEdit, icon: FilePenLine, text: "EDIT" },
                        { icon: Trash2, text: "DELETE" },
                        { icon: Archive, text: "ARCHIVE" }
                ]} />
            </div>

            <Search onSearch={handleSearch}/>

            {loading ? <p>Loading...</p> : error ? <p className="text-red-500">{error}</p> : 
                <DataTable columns={columns} data={filteredData} setSelectedRow={setSelectedRow} /> }

            {isModalOpen && (
                <UserRegistrationForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} 
                    apiEndpoint="payments" formFields={paymentFormFields} initialValues={selectedRow} handleSubmit={handleSubmit}/>
            )}
            <ToastContainer /> 
        </div>
    );
}
