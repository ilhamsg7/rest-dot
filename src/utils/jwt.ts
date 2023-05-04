import { envConfig } from "../env.config";
import jwt from "jwt-promisify";

type PayLoad = {
    id: string;
    email: string;
    role: string;
}

export default {
    accessToken: (payload: PayLoad) => 
        jwt.sign(payload, envConfig.JWT_SECRET_KEY, {
            expiresIn: envConfig.ACCESS_TOKEN_EXPIRED,
            algorithm: "HS256",
        }),
    

    refreshToken: (payload: PayLoad) => 
        jwt.sign(payload, envConfig.JWT_SECRET_KEY, {
            expiresIn: envConfig.REFRESH_TOKEN_EXPIRED,
            algorithm: "HS256",
        }),
    
    verify: (token: string) => jwt.verify(token, envConfig.JWT_SECRET_KEY),

    verifyRefreshToken: (token: string) => 
        jwt.verify(token, envConfig.JWT_REFRESH_KEY, { algorithms: ["HS256"] }),
    
    decode: (token: string) => jwt.decode(token),
}