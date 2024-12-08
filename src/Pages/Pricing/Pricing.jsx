import React from 'react'
import { PriceCard } from '../../layouts/PriceCard'
import planImg from '../../assets/planning.jpg';



const pricingPlans = [
  {
    title: "1 Month Plan",
    price: "2000",
    features: [
      "Free riding",
      "Unlimited equipment",
      "Personal trainer",
      "Weight losing classes",
      "Month to month",
      "No time restriction"
    ]
  },
  {
    title: "3 Month Plan",
    price: "5000",
    features: [
      "Free riding",
      "Unlimited equipment",
      "Personal trainer",
      "Weight losing classes",
      "Month to month",
      "No time restriction"
    ]
  },
  {
    title: "6 Month Plan",
    price: "9000",
    features: [
      "Free riding",
      "Unlimited equipment",
      "Personal trainer",
      "Weight losing classes",
      "Month to month",
      "No time restriction"
    ]
  },
  {
    title: "12 Month Plan",
    price: "16000",
    features: [
      "Free riding",
      "Unlimited equipment",
      "Personal trainer",
      "Weight losing classes",
      "Month to month",
      "No time restriction"
    ]
  },
];

export default function Pricing() {
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
          <h1 className="mb-6 text-5xl font-bold tracking-wider">
            OUR PLANS
          </h1>
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
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <PriceCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

