import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000/api"
    : import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiRequest = async ({ method, url, data = {}, params = {} }) => {
  try {
    const fullUrl = url.startsWith("/") ? `${BASE_URL}${url}` : url;

    const config = {
      method,
      url: fullUrl,
      data,
      params,
    };

    const response = await apiClient(config);

    if (!response.status === 200) {
      throw new Error(config);
    }
    return response.data;
  } catch (error) {
    console.error(`Error during ${method} request to ${url}:`, error);
    throw error;
  }
};

export default apiRequest;
