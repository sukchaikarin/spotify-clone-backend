import express from "express";
import signUpRouter from "../routes/signup.js";
import memberRouter from "../routes/member.js";
const apiRoute = express.Router();


apiRoute.get("/", (req, res) => res.send("This is apiroute "));

apiRoute.use("/signup", signUpRouter);
apiRoute.use("/member", memberRouter);


export default apiRoute;
