import React from 'react';
import { FaUsers } from 'react-icons/fa';

const Expire = ({ expiredMembers = [] , expiringMembers=[]}) => {
  return (
    <div className="grid grid-cols-2 gap-6 bg-gray-50">
      {/* Expired Members Section */}
      <div className="bg-white p-5 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FaUsers className="w-6 h-6 text-primary" />
            <h2 className="text-gray-900 text-xl font-medium">Membership Expired</h2>
          </div>
          <span className="bg-secondary text-primary px-2 py-1 rounded text-sm">
            {expiredMembers.length}
          </span>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {expiredMembers.length > 0 ? (
            expiredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-secondary p-4 rounded-lg flex items-center justify-between mb-2"
              >
                <div className="flex items-center space-x-4">
                  {/* Dynamic Image (Fallback to Placeholder) */}
                  <img
                    src={member.image ? member.image : "/placeholder.svg"}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-red-400 font-medium">{member.name}</h3>
                    <p className="text-slate-400 text-sm">
                      Expired Date: {member.expire_date || "N/A"} {/* Dynamic Expiry Date */}
                    </p>
                  </div>
                </div>
                <div className="text-gray-900">
                  {/* Show Amount Dynamically, Default to 0 if Missing */}
                  NRP {member.amount ? member.amount.toLocaleString() : "0.00"}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No expired members found.</p>
          )}
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FaUsers className="w-6 h-6 text-primary" />
            <h2 className="text-gray-900 text-xl font-medium">Membership Expiring</h2>
          </div>
          <span className="bg-secondary text-primary px-2 py-1 rounded text-sm">
            {expiringMembers.length}
          </span>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {expiringMembers.length > 0 ? (
            expiringMembers.map((members) => (
              <div
                key={members.id}
                className="bg-secondary p-4 rounded-lg flex items-center justify-between mb-2"
              >
                <div className="flex items-center space-x-4">
                  {/* Dynamic Image (Fallback to Placeholder) */}
                  <img
                    src={members.image ? members.image : "/placeholder.svg"}
                    alt={members.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-red-400 font-medium">{members.name}</h3>
                    <p className="text-slate-400 text-sm">
                      Expiring Date: {members.expire_date || "N/A"} {/* Dynamic Expiry Date */}
                    </p>
                  </div>
                </div>
                <div className="text-gray-900">
                  {/* Show Amount Dynamically, Default to 0 if Missing */}
                  NRP {members.amount ? members.amount.toLocaleString() : "0.00"}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No expired members found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expire;
