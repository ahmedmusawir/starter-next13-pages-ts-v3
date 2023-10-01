import { AxiosError } from "@/global-interfaces";
import strapiApiClient from "@/services/strapiApiClient";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { identifier, password } = req.body;

  try {
    const strapiRes = await strapiApiClient.post(`/auth/local`, {
      identifier,
      password,
    });

    const jwt: string = strapiRes.data.jwt;

    // Fetch the full user object with the profile image
    const userResponse = await strapiApiClient.get("/users/me?populate=*", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: "strict",
        path: "/",
      })
    );

    // Return the full user object
    res.status(200).json({ user: userResponse.data });
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
