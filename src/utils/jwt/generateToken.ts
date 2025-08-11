import jwt from "jsonwebtoken";
require("dotenv").config();

const accessToken_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;

const refreshToken_SECRET: string = process.env.REFRESH_TOKEN_SECRET as string;

const generateToken = (roleId: string, role: string) => {
    if (!roleId) throw new Error(`${role} ID missing in generateTokens`);

    const accessToken = jwt.sign(
        {
            _id: roleId,
            role
        },
        accessToken_SECRET,
        {
            expiresIn: "1m",
        }
    );
 
    const refreshToken = jwt.sign({ _id: roleId.toString(), role }, refreshToken_SECRET, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
};

export default generateToken;