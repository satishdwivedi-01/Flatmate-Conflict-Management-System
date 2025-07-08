import express from "express";

import connectToDB from "./config/mongoose.config.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";
import complaintRouter from "./routes/complaint.routes.js";
import leaderBoardRouter from "./routes/leaderBoard.routes.js";




const app = express();

const port = process.env.PORT || 3000;

app.use(cookieParser()); 


dotenv.config();

connectToDB();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
  origin: [
    "http://localhost:5173", 
  ],
  credentials: true,
};

app.use(cors(corsOptions));

// routes 
app.use("/user", userRoutes);
app.use("/complaints", complaintRouter);
app.use("/leaderBoard", leaderBoardRouter);



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
