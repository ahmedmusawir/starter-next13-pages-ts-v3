import { NextApiRequest, NextApiResponse } from "next";
import strapiApiClient from "@/services/strapiApiClient";
import { AxiosError } from "@/global-interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const { userId, imageId } = req.body;

  try {
    const userResponse = await strapiApiClient.put(
      `/users/${userId}?populate=*`,
      {
        profileImage: imageId,
      },
      {
        headers: {
          Authorization: `Bearer ${req.cookies.jwt}`,
        },
      }
    );

    return res.status(200).json(userResponse.data);
  } catch (err) {
    const error = err as AxiosError;
    console.error("Error updating user:", error);
    return res.status(error.response?.status || 500).json(error.response?.data);
  }
};
