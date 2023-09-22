// strapiSimpleClient.ts
import axios from "axios";

const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL;

const apiClient = axios.create({
  baseURL: strapiApiUrl,
});

export default apiClient;
