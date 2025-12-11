import { Response, NextFunction } from "express";
import { AuthRequest } from "./authenticateToken";

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Admin privileges required" });
  }
  next();
};