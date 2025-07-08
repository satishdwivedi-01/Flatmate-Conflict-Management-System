import express from "express";
import { getLeaderboard} from "../controllers/leaderboardController.js";
import auth from "../middlewares/JwtAuth.js";

const leaderBoardRouter = express.Router();

leaderBoardRouter.get("/", auth, getLeaderboard);

export default leaderBoardRouter;
