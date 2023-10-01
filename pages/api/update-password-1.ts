import { NextApiRequest, NextApiResponse } from "next";
import strapiApiClient from "@/services/strapiApiClient";
import { AxiosError } from "@/global-interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const { currentPassword, newPassword } = req.body;

  // Fetch the user data
  const user = await strapi.plugins["users-permissions"].services.user.fetch(
    {
      id: userId,
    },
    ["role"]
  );

  // Validate the current password
  const validPassword = await strapi.plugins[
    "users-permissions"
  ].services.user.validatePassword(currentPassword, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: "Current password is incorrect." });
  }

  try {
    const response = await strapiApiClient.put(
      "/auth/change-password",
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${req.cookies.jwt}`,
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (err) {
    const error = err as AxiosError;
    console.error("Error updating password:", error);
    return res.status(error.response?.status || 500).json(error.response?.data);
  }
};
