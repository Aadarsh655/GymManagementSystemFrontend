// import axios from "axios";

// export default axios.create({
//     baseURL: "http://localhost:8000",
//     withCredentials: true,
// })

import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await axios({
      url: `${API_BASE_URL}/${endpoint}`,
      method,
      headers,
      data: body, // Axios handles JSON stringification automatically
    });

    return response.data; // Axios wraps the response in a "data" field
  } catch (error) {
    console.error("API Request Error:", error);

    if (error.response) {
      // Axios includes a response object for HTTP errors
      throw new Error(error.response.data.message || "An error occurred");
    } else {
      throw new Error(error.message || "Network Error");
    }
  }
};

export default apiRequest;