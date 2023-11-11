import axios from "axios";

const strapiApiKey = process.env.STRAPI_API_KEY;
const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL;
const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_ASSETS_BASE_URL;

const strapiApiClient = axios.create({
  baseURL: strapiApiUrl,
  headers: { Authorization: `Bearer ${strapiApiKey}` },
});

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
export const uploadImage = async (formData: FormData) => {
  return strapiApiClient.post(
    `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// Function to updating the current User with profile image
export const updateUserProfileImage = async (
  userId: number,
  imageId: number
) => {
  return strapiApiClient.put(`/users/${userId}`, {
    profileImage: imageId,
  });
};

export default strapiApiClient;
