import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
});

export default apiClient;
