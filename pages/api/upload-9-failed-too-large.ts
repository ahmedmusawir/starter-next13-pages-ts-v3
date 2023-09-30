import type { NextApiRequest, NextApiResponse } from "next";
import { uploadImage } from "@/services/strapiApiClient";
import { AxiosError } from "@/global-interfaces";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  if (!process.env.STRAPI_UPLOAD_API_KEY) {
    return res.status(500).json({ error: "Server configuration error." });
  }

  console.log("REQ BODY IN PAGES/API/UPLOAD.TS", req.body);

  try {
    const strapiRes = await uploadImage(
      req.body,
      process.env.STRAPI_UPLOAD_API_KEY
    );
    return res.status(200).json(strapiRes.data);
  } catch (err) {
    const error = err as AxiosError;
    console.error("Error uploading image:", error);
    return res.status(error.response?.status || 500).json(error.response?.data);
  }
};
