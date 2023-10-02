import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { AxiosError } from "@/global-interfaces";
import strapiApiClient from "@/services/strapiApiClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { username, email, password } = req.body;

  try {
    // Signup user using Strapi's endpoint
    const response = await strapiApiClient.post("/auth/local/register", {
      username,
      email,
      password,
    });

    // Registration was successful
    return res.status(200).json(response.data);
  } catch (err) {
    const error = err as AxiosError;

    // Check if the error response has the expected format
    if (error.response?.data?.error?.message) {
      const errorMessage = error.response.data.error.message;
      const statusCode = error.response.data.error.status;

      return res.status(statusCode).json({
        error: errorMessage,
      });
    }

    console.error("Error updating password:", error);
    return res.status(error.response?.status || 500).json({
      error: "An unexpected error occurred.",
    });
  }
};
