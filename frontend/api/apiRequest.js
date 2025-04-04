import axios from "axios";

const BASE_URL = "https://jamoveotask-production.up.railway.app/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
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
    console.error(`Error during ${method} request to ${url}:`, error);
    throw error;
  }
};

export default apiRequest;
