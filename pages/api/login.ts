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

    res.status(200).json({ user: strapiRes.data.user });
  } catch (err) {
    const error = err as AxiosError;
    console.error("Error during login:", error);
    res.status(error.response?.status || 500).json(error.response?.data);
  }
};
