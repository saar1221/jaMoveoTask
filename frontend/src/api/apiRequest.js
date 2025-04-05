import axios from "axios";
import toast from "react-hot-toast";

const { MODE, VITE_API_BASE_URL } = import.meta.env;

const BASE_URL =
  MODE === "development" ? "http://localhost:4000/api" : VITE_API_BASE_URL;

const getToken = () => localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
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
    toast.error(error.response?.data?.message);
    console.error(`Error during ${method} request to ${url}:`, error);
    throw error;
  }
};

export default apiRequest;
