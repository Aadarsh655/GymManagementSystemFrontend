import React, { useState, useEffect } from "react";
import { PriceCard } from "../../layouts/PriceCard";
import planImg from "../../assets/planning.jpg";
import apiRequest from "@/api/axios";
import Input from "@/components/UI/Input";

// Default facility list
const defaultFacilities = [
  "Weightlifting",
  "Cardio",
  "Shower",
  "Sauna",
  "Locker",
  "Body Massage",
  "Crossfit"
];

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Membership Plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await apiRequest("membership", "GET");

        // Filter only active memberships
        const activePlans = response.filter(plan => plan.status === "Active");

        // Ensure facilities is an array
        const formattedPlans = activePlans.map(plan => ({
          ...plan,
          facilities: Array.isArray(plan.facilities) ? plan.facilities : []
        }));

        setPlans(formattedPlans);
      } catch (err) {
        console.error("Error fetching membership plans:", err);
        setError("Failed to load membership plans.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    try {
        const response = await apiRequest("payment/initialize", "POST", {
            amount: 100,
            tax_amount: 10,
            total_amount: 110,
            product_code: "EPAYTEST",
            product_service_charge: 0,
            product_delivery_charge: 0,
            success_url: "http://localhost:5173/pricing", 
            failure_url: "http://localhost:5173/pricing", 
            signed_field_names: "total_amount,transaction_uuid,product_code",
            // signature: "i94zsd3oXF6ZsSr/kGqT4sSzYQzjj1W/waxjWyRwaME="
        });

        if (response && response.status === 'success') {
            window.location.href = response.payment_url; // Redirect to eSewa payment page
        } else {
            console.error("Payment initialization failed:", response.message);
        }
    } catch (err) {
        setAuthError("Invalid credentials. Contact Admin.");
    }
};

  
  const handleEnroll = (plan) => {
    setSelectedPlan(plan);
    setAuthError(null);
    setIsModalOpen(true); // Open the modal when a plan is selected
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={planImg}
          alt="Gym background"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="mb-6 text-5xl font-bold tracking-wider">OUR PLANS</h1>
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="hover:text-primary transition-colors duration-300">
              Home
            </a>
            <span>›</span>
            <span className="text-primary">Plan</span>
          </nav>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto py-16">
        {loading ? (
          <p className="text-center">Loading plans...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : plans.length === 0 ? (
          <p className="text-center text-gray-400">No active plans available.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <PriceCard
                key={plan.membership_id}
                title={plan.membership_name}
                price={plan.price}
                onEnroll={()=>handleEnroll(plan)}
                features={defaultFacilities.map(facility => ({
                  name: facility,
                  available: plan.facilities.some(f => f.toLowerCase() === facility.toLowerCase())
                  
                }))}
              />
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold">Enroll in {selectedPlan.membership_name}</h2>
          <form  onSubmit={handleSubmit} className="mt-4">
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white mb-2"
            />
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white mt-2"
            />
            {authError && <p className="text-red-500 mt-2">{authError}</p>}
            <button type="submit" onClick={handleSubmit} className="mt-4 p-2 bg-green-600 w-full text-white">
              Proceed to Payment
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button className="absolute top-2 right-2 text-primary" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};