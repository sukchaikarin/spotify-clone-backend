import express from "express";
import databaseClient from "../configs/database.mjs";
import auth from "../middlewares/auth.js";
const memberRouter = express.Router();





memberRouter.get("/", auth, async (req, res) => {
    try {
        const { googleId } = req.data.member;

        const memberData = await databaseClient
            .db()
            .collection("members")
            .findOne({ googleId });

        if (memberData) {
            return res.status(200).json({ message: "Login successful", memberData });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
export default memberRouter;
