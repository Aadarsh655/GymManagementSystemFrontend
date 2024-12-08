import React from 'react';

export function PriceCard({ title, price, features }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">{title}</h3>
        <div className="text-center mb-6">
          <span className="text-4xl font-bold text-gray-900">₹{price}</span>
          <span className="text-xl font-semibold text-gray-600">/month</span>
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 pb-6">
        <button className="w-full bg-primary text-white rounded-md py-2 font-semibold hover:bg-primary-700 transition-colors duration-300">
          Choose Plan
        </button>
      </div>
    </div>
  );
}