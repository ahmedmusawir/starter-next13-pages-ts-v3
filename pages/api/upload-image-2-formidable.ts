import type { NextApiRequest, NextApiResponse } from "next";
import strapiApiClient, { setAuthToken } from "@/services/strapiApiClient";
import { AxiosError } from "@/global-interfaces";
import { Files, File } from "formidable";
import fs from "fs";
const formidable = require("formidable");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const form = new formidable.IncomingForm();

  form.parse(
    req,
    async (err: any, fields: { [key: string]: any }, files: Files) => {
      if (err) {
        return res.status(500).json({ error: "Error parsing form data." });
      }

      if (!files.files || files.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded." });
      }

      const uploadedFile = files.files[0];

      // Set the JWT token for the request
      setAuthToken(req?.cookies?.jwt || null);

      try {
        const fileStream = fs.createReadStream(uploadedFile.filepath);

        const strapiRes = await strapiApiClient.post(`/upload`, fileStream, {
          headers: {
            ...req.headers,
            // "Content-Type": "multipart/form-data",
            "Content-Type": uploadedFile.mimetype,
          },
        });

        // Clean up: Delete the temp file
        fs.unlink(uploadedFile.filepath, (err) => {
          if (err) console.error("Error deleting temp file:", err);
        });

        return res.status(200).json(strapiRes.data);
      } catch (err) {
        const error = err as AxiosError;
        console.error("Error uploading image to Strapi:", error);
        return res
          .status(error.response?.status || 500)
          .json(error.response?.data);
      }
    }
  );
};
