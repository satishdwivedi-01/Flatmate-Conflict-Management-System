import User from "../models/user.model.js";
import Complaint from "../models/complaint.model.js";

export const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find().sort({ karmaPoints: -1 }).limit(5).select("username karmaPoints");
    console.log(topUsers)
    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
};


