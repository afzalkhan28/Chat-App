import express from "express";
import dotenv from "dotenv";

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js"

const app = express();
const PORT = process.env.PORT || 7001;

dotenv.config();
app.use(express.json());



// app.get("/" , (req,res) => {
//     res.send(`Hello Afzal!! This is me `);
// });

app.use("/api/auth", authRoutes);

app.listen(7001, () => {
    connectToMongoDB();
    console.log(`App is running on port ${PORT}`)
});
    