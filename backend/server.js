import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./db/connectToMongoDB.js";

import messageRoutes from "./routes/message.routes.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"

const app = express();

const PORT = process.env.PORT || 7001;

dotenv.config();
app.use(express.json());
app.use(cookieParser());



// app.get("/" , (req,res) => {
//     res.send(`Hello Afzal!! This is me `);
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(7001, () => {
    connectToMongoDB();
    console.log(`App is running on port ${PORT}`)
});
    