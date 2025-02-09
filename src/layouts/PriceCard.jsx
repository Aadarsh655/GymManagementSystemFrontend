import React from "react";
import { CheckCircle, XCircle } from "lucide-react"; // Import icons

export function PriceCard({ title, price, features }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">{title}</h3>
        <div className="text-center mb-6">
          <span className="text-4xl font-bold text-gray-900">NPR.{price}</span>
        </div>

        {/* Facilities List */}
        <ul className="space-y-3">
          
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              {feature.available ? (
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
              )}
              <span className={feature.available ? "text-gray-700" : "text-gray-400 line-through"}>
                {feature.name}
              </span>
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
