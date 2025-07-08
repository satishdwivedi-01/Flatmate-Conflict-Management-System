import express from "express";
import {
  createComplaint,
  getComplaints,
  resolveComplaint,
  voteComplaint,
} from "../controllers/complaintController.js";

import auth from "../middlewares/JwtAuth.js";

const complaintRouter = express.Router();

complaintRouter.post("/", auth, createComplaint);
complaintRouter.get("/", auth, getComplaints);
complaintRouter.put("/:id/resolve", auth, resolveComplaint);
complaintRouter.post("/:id/vote", auth, voteComplaint);

export default complaintRouter; 
