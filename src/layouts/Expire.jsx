import React from 'react';
import { FaUsers, FaChevronUp, FaChevronDown } from 'react-icons/fa';

const members = [
  {
    id: 1,
    name: "LAXMAN CHAUDHARY",
    expiredDate: "2024-06-17",
    amount: 2000.00,
    avatar: "/placeholder.svg?height=48&width=48"
  },
  {
    id: 2,
    name: "RAKHESH MAHARJAN",
    expiredDate: "2024-04-17",
    amount: 12000.00,
    avatar: "/placeholder.svg?height=48&width=48"
  },
  {
    id: 3,
    name: "KALPANA BUDATHOKI",
    expiredDate: "2024-06-11",
    amount: 8000.00,
    avatar: "/placeholder.svg?height=48&width=48"
  },
  {
    id: 4,
    name: "ADARSHA SHAH",
    expiredDate: "2024-02-17",
    amount: 3000.00,
    avatar: "/placeholder.svg?height=48&width=48"
  }
];

const Expire= () => {
  return (
    
    <div className="grid grid-cols-2 gap-6 bg-gray-50">
      {/* Expired Members Section */}
      <div className='bg-white p-5 rounded-lg'>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FaUsers className="w-6 h-6 text-primary" />
            <h2 className="text-gray-900 text-xl font-medium">Membership Expiration</h2>
          </div>
          <span className="bg-secondary text-primary px-2 py-1 rounded text-sm">17</span>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-secondary p-4 rounded-lg flex items-center justify-between mb-2"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-red-400 font-medium">{member.name}</h3>
                  <p className="text-slate-400 text-sm">
                    Expired Date: {member.expiredDate}
                  </p>
                </div>
              </div>
              <div className="text-gray-900">NRP {member.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Expiring Members Section */}
      <div className='bg-white p-5 rounded-lg'>
      <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FaUsers className="w-6 h-6 text-primary" />
            <h2 className="text-gray-900 text-xl font-medium">Membership Expiring</h2>
          </div>
          <span className="bg-secondary text-primary px-2 py-1 rounded text-sm">17</span>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-secondary p-4 rounded-lg flex items-center justify-between mb-2"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-red-400 font-medium">{member.name}</h3>
                  <p className="text-slate-400 text-sm">
                    Expired Date: {member.expiredDate}
                  </p>
                </div>
              </div>
              <div className="text-gray-900">NRP {member.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
 

  

  );
};

export default Expire;