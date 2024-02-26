import express from "express";
import databaseClient from "../configs/database.mjs";
const signUpRouter = express.Router();
import { createJwt } from "../utils/jwtUtils.js";

signUpRouter.get("/", (req, res) => res.send("This is signUpRouter "));

signUpRouter.post("/", async (req, res) => {
    const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000;
    let member = req.body;
    //res.send(member)
    const { googleId } = member;
    const userData = await databaseClient
        .db()
        .collection("members")
        .findOne({ googleId });
    if (userData) {
        const token = createJwt(googleId);
        res.cookie("token", token, {
            maxAge: tenDaysInMilliseconds,
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        return res.status(200).json({ message: "Login successful", token });

    }

    try {

        await databaseClient.db().collection("members").insertOne(member);

        const token = createJwt(googleId);
        res.cookie("token", token, {
            maxAge: tenDaysInMilliseconds,
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });

        return res.status(200).json({ message: "Create user data successfully", token });
    } catch (error) {
        console.error("Error hashing password or inserting user data:", error);
        return res.status(500).send("An error occurred during sign up.");
    }
});

export default signUpRouter;
