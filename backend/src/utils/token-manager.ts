// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { COOKIE_NAME } from "./constants.js";

// export const createToken = (id: string, email: string, expiresIn: string) => {
//   const payload = { id, email };
//   const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
//     expiresIn:"7d",
//   });
//   return token;
// };

// export const verifyToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.signedCookies[`${COOKIE_NAME}`];
//   if (!token || token.trim() === "") {
//     return res.status(401).json({ message: "Token Not Received" });
//   }
//   return new Promise<void>((resolve, reject) => {
//     return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
//       if (err) {
//         reject(err.message);
//         return res.status(401).json({ message: "Token Expired" });
//       } else {
//         resolve();
//         res.locals.jwtData = success;
//         return next();
//       }
//     });
//   });
// };
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Create token function remains the same
export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",  // you can keep "7d" hardcoded or use expiresIn param
  });
  return token;
};

// Verify token using Authorization header instead of cookies
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token Not Received" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    res.locals.jwtData = decoded; // save payload for next middleware/controllers
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token Expired or Invalid" });
  }
};

