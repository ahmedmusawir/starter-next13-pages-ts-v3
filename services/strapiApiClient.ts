import axios from "axios";

const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL;

const apiClient = axios.create({
  baseURL: strapiApiUrl,
});

// Function to set the JWT token for subsequent requests
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers["Authorization"];
  }
};

export default apiClient;
