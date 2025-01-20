import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = {
    // "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await axios({
      url: `${API_BASE_URL}/${endpoint}`,
      method,
      headers,
      data: body, 
    });

    return response.data; 
  } catch (error) {
    console.error("API Request Error:", error);

    if (error.response) {
      
      throw new Error(error.response.data.message || "An error occurred");
    } else {
      throw new Error(error.message || "Network Error");
    }
  }
};

export default apiRequest;