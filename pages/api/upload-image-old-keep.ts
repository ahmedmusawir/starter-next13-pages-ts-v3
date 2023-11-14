import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL;
  const strapiApiKey = process.env.STRAPI_UPLOAD_API_KEY;

  const contentType = req.headers["content-type"];

  if (!contentType) {
    return res.status(400).json({ message: "Missing Content-Type header" });
  }

  // Forward the request to Strapi
  const strapiResponse = await fetch(`${strapiApiUrl}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${strapiApiKey}`,
      // Forward the content-type header from the original request
      "Content-Type": contentType,
    },
    // Stream the request body directly to Strapi
    body: req,
  });

  if (!strapiResponse.ok) {
    // Forward the error from Strapi
    const error = await strapiResponse.json();
    return res.status(strapiResponse.status).json(error);
  }

  // Forward the successful response from Strapi
  const data = await strapiResponse.json();
  return res.status(200).json(data);
}
