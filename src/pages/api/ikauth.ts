// import ImageKit from "imagekit";
import imagekit from "../../utils/imageKitConfig";
import type { NextApiRequest, NextApiResponse } from "next";
// export const imagekit = new ImageKit({
//   publicKey: process.env.NEXT_PUBLIC_PUBLICKEY!,
//   privateKey: process.env.IK_PRIVATEKEY!,
//   urlEndpoint: process.env.NEXT_PUBLIC_URLENDPOINT!,
// });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = imagekit.getAuthenticationParameters();

  res.status(200).json(result);
}
