// import { useEffect, useState } from "react";
// import apiRequest from "@/api/axios"; // Ensure correct import

// export default function Header() {
//   const [userName, setUserName] = useState("Loading...");

//   const fetchUserName = async () => {
//     try {
//       const loggedInUserId = Number(localStorage.getItem("name")); // Convert to number
//       if (!loggedInUserId) {
//         console.error("Logged in User ID is missing or invalid");
//         setUserName("Guest"); // Fallback for missing ID
//         return;
//       }

//       console.log("Logged in User ID:", loggedInUserId); // Debug

//       const response = await apiRequest("user", "GET"); // API endpoint for fetching users
//       console.log("API Response:", response); // Debug

//       if (response && Array.isArray(response)) {
//         const loggedInUser = response.find((user) => user.id === loggedInUserId);
//         if (loggedInUser && loggedInUser.name) {
//           setUserName(loggedInUser.name); // Update state with logged-in user's name
//         } else {
//           console.error("Logged in user not found in response");
//           setUserName("Guest"); // Fallback
//         }
//       } else {
//         console.error("Invalid API response format");
//         setUserName("Guest"); // Fallback
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       setUserName("Error"); // Handle errors gracefully
//     }
//   };

//   useEffect(() => {
//     fetchUserName();
//   }, []);

//   return (
//     <div className="w-full sticky top-0 z-20 py-2 bg-gray-50">
//     <div className="flex items-center justify-between py-3 px-5 bg-white rounded-[12px]">
//       <div>
//         <h1 className="text-lg sm:text-xl font-medium">
//           Hello, {userName}!
//         </h1>
//         <p className="text-primary text-sm sm:text-base">Admin</p>
//       </div>
//       <div className="text-lg sm:text-xl text-primary font-semibold bg-secondary p-2 rounded-full">
//         {userName
//           .split(" ")
//           .map((word) => word.charAt(0))
//           .join("")} {/* Initials */}
//       </div>
//     </div>
//   </div>
  

//   );
// }
import { useEffect, useState } from "react";
import apiRequest from "@/api/axios"; // Ensure correct import path

export default function Header() {
  const [userName, setUserName] = useState("Loading...");

  const fetchUserName = async () => {
    try {
      const loggedInUserId = Number(localStorage.getItem("name"));
      if (!loggedInUserId) {
        console.warn("Logged in User ID is missing or invalid");
        setUserName("Guest");
        return;
      }

      console.log("Logged in User ID:", loggedInUserId);

      const response = await apiRequest("user", "GET");
      console.log("API Response:", response);

      if (response && Array.isArray(response)) {
        const loggedInUser = response.find((user) => user.id === loggedInUserId);
        if (loggedInUser?.name) {
          setUserName(loggedInUser.name);
        } else {
          console.warn("Logged in user not found in API response");
          setUserName("Guest");
        }
      } else {
        console.error("Unexpected API response format");
        setUserName("Guest");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      setUserName("Error");
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <div className="w-full sticky top-0 z-20 py-2 bg-gray-50">
      <div className="flex items-center justify-between py-3 px-5 bg-white rounded-[12px]">
        <div>
          <h1 className="text-lg sm:text-xl font-medium">
            Hello, {userName}!
          </h1>
          <p className="text-primary text-sm sm:text-base">Admin</p>
        </div>
        <div className="text-lg sm:text-xl text-primary font-semibold bg-secondary p-2 rounded-full">
          {userName
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join("")}
        </div>
      </div>
    </div>
  );
}
