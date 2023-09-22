// strapiSimpleClient.ts
import axios from "axios";

const apiUrl = "http://localhost:4000";

const apiClient = axios.create({
  baseURL: apiUrl,
});

export default apiClient;
