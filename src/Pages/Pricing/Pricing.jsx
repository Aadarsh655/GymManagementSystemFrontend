import React, { useState, useEffect } from "react";
import { PriceCard } from "../../layouts/PriceCard";
import planImg from "../../assets/planning.jpg";
import apiRequest from "@/api/axios";


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
                features={defaultFacilities.map(facility => ({
                  name: facility,
                  available: plan.facilities.some(f => f.toLowerCase() === facility.toLowerCase())  // Check if facility is available
                }))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
