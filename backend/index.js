import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";

dotenv.config({
    path: ".env"
})



const app = express();


databaseConnection();
app.use(express.urlencoded({
    extended:true
}));
 
app.use(express.json());
app.use(cookieParser());

const corsOption = {
    origin: true,
    credentials:true
}

app.use(cors(corsOption));

//route

app.use("/api/v1/user", userRoute );
app.use("/api/v1/tweet", tweetRoute ); //http://localhost:8080/api/v1/user/register


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Comming from backend...."
    })
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server listent at port number ${PORT}`)
})