import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("jwt", "", {
      maxAge: -1,
      path: "/",
    })
  );

  res.status(200).json({ message: "Logged out" });
};
