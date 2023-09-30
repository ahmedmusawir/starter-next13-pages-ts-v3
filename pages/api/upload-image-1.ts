import type { NextApiRequest, NextApiResponse } from "next";
import strapiApiClient, { setAuthToken } from "@/services/strapiApiClient";
import { AxiosError } from "@/global-interfaces";

const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_ASSETS_BASE_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  // Set the JWT token for the request
  setAuthToken(req?.cookies?.jwt || null);

  try {
    const formData = new FormData();
    formData.append("files", req.body.profileImage);

    const strapiRes = await strapiApiClient.post(`/upload`, formData, {
      headers: {
        ...req.headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.status(200).json(strapiRes.data);
  } catch (err) {
    const error = err as AxiosError;
    console.error("Error uploading image to Strapi:", error);
    return res.status(error.response?.status || 500).json(error.response?.data);
  }
};
