// /pages/api/current-user.ts
import { NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "@/global-interfaces";
import strapiApiClient from "@/services/strapiApiClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userResponse = await strapiApiClient.get("/users/me?populate=*", {
      headers: {
        Authorization: `Bearer ${req.cookies.jwt}`,
      },
    });

    if (userResponse.data) {
      return res.status(200).json(userResponse.data);
    } else {
      return res.status(401).json({ error: "Not authenticated" });
    }
  } catch (err) {
    const error = err as AxiosError;
    console.error("Error during login:", error);
    return res.status(error.response?.status || 500).json(error.response?.data);
  }
};
