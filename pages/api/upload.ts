import type { NextApiRequest, NextApiResponse } from "next";
import { uploadImage } from "@/services/strapiApiClient";
import { AxiosError } from "@/global-interfaces";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import streamToPromise from "stream-to-promise";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL;
  const strapiApiKey = process.env.STRAPI_UPLOAD_API_KEY;

  if (!strapiApiKey) {
    return res.status(500).json({ error: "Server configuration error." });
  }

  try {
    // console.log("BODY.REQ.FILES", req.body);
    const buffer = await streamToPromise(req);

    const strapiRes = await fetch(`${strapiApiUrl}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${strapiApiKey}`,
      },
      body: buffer,
    });

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      throw new Error(data.message || "Error uploading to Strapi");
    }

    return res.status(200).json(data);
  } catch (err) {
    const error = err as AxiosError;

    console.error("Error uploading image:", error);
    return res.status(error.response?.status || 500).json(error.response?.data);
  }
};
