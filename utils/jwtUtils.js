import jwt from "jsonwebtoken";
const createJwt = (googleId) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const payload = {
        member: {
            googleId,
        },
    };
    const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "10d" });
    return token;
};
export { createJwt };
