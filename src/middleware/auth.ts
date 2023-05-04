import { NextFunction, Request, Response } from "express";
import { wrapError } from "../utils/wrap";
import { StatusCodes } from "http-status-codes";
import prisma from "../utils/prisma";
import jwt, { TokenExpiredError } from "jwt-promisify";
import { container } from "tsyringe";
import { UserRole } from "../packages/user";
import { envConfig } from "../env.config";
export type UserStatusRoles = {
    id: string;
    role: UserRole;
};
  
export function authMiddleware(roles: string[]) {
    return async function (req: Request, res: Response, next: NextFunction) {
      await wrapError(res, async () => {
        const tokenWithBearer = req.headers.authorization;
  
        if (tokenWithBearer === undefined) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Token is required to request this operation.",
          });
        }
  
        const token = tokenWithBearer.split(" ")[1];
        const decoded = await jwt.verify(token, envConfig.JWT_SECRET_KEY!);
  
        let user: UserStatusRoles | null = null;
          try {
            user = await prisma.user.findUnique({
              where: { id: decoded.id },
              select: { id: true, role: true, },
            });
          } catch (error) {
            if (error instanceof TokenExpiredError) {
              return res
                .status(StatusCodes.FORBIDDEN)
                .json({ message: "Token expired." });
            }
            const message =
              error instanceof Error ? error.message : "Internal Server Error";
            return res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message });
          }

  
        if (user === null) {
          return res
            .status(StatusCodes.FORBIDDEN)
            .json({ message: "Token doesn't contain a valid user" });
        }
  
        if (!roles.includes(user.role)) {
          return res.status(StatusCodes.FORBIDDEN).json({
            message: "Your access level authorization is denied.",
          });
        }
  
        res.locals.token = decoded;
        next();
      });
    };
  }
  
  export default authMiddleware;
  