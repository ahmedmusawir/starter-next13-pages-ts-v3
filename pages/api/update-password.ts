import { AxiosError } from "@/global-interfaces";
import { NextApiRequest, NextApiResponse } from "next";
import strapiApiClient from "@/services/strapiApiClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const { currentPassword, newPassword, confirmPassword } = req.body;
  const jwt = req.cookies.jwt; // Extract JWT from the http-only cookie

  if (!jwt) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    // Update the password using Strapi's endpoint
    const response = await strapiApiClient.post(
      "/auth/change-password",
      {
        currentPassword: currentPassword, // Current password
        password: newPassword, // New password
        passwordConfirmation: confirmPassword, // Confirm new password
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

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
