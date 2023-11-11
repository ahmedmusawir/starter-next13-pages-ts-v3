import axios from "axios";

const strapiApiKey = process.env.STRAPI_API_KEY;
const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL;
const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_ASSETS_BASE_URL;

const strapiApiClient = axios.create({
  baseURL: strapiApiUrl,
  headers: { Authorization: `Bearer ${strapiApiKey}` },
});

// console.log("UPLOAD API KEY", process.env.STRAPI_UPLOAD_API_KEY);
// console.log(  "UPLOAD CLIENT SIDE API KEY",  process.env.NEXT_PUBLIC_STRAPI_API_KEY);
// console.log("API URL", process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL);

// Function to set the JWT token for subsequent requests
export const setAuthToken = (token: string | null) => {
  if (token) {
    strapiApiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    strapiApiClient.defaults.headers[
      "Authorization"
    ] = `Bearer ${strapiApiKey}`;
  }
};

// Function for image upload
export const uploadImage = async (formData: FormData, token: string) => {
  return strapiApiClient.post(`/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default strapiApiClient;