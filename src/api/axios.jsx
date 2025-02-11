import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = {};

  // Ensure token is a valid string before adding it to headers
  if (token && typeof token === "string") {
    headers.Authorization = `Bearer ${token}`;
  }

  // Handle Content-Type based on request type
  if (body instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
    headers.Accept = "application/json"; // Explicitly set Accept header
  } else {
    headers["Content-Type"] = "application/json";
    headers.Accept = "application/json";
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
