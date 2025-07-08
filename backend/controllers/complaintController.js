import Complaint from "../models/complaint.model.js";
import User from "../models/user.model.js";
// File a complaint
export const createComplaint = async (req, res) => {
  const { title, description, type, severity, createdBy } = req.body;
  console.log(req.body);
  console.log(req.user);
  try {
    const complaint = await Complaint.create({
      title,
      description,
      type,
      severity,
      createdBy,
    });
    console.log(complaint);
    res.status(201).json(complaint);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating complaint", error: err.message });
  }
};

// Get all active complaints
export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ resolved: false }).populate(
      "createdBy",
      "name"
    );
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

// Resolve a complaint
export const resolveComplaint = async (req, res) => {
  const { id } = req.params;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    complaint.resolved = true;
    await complaint.save();

    // Reward resolver, not creator
    await User.findByIdAndUpdate(req.user.userid, { $inc: { karmaPoints: 10 } });

    res.json({ message: "Complaint resolved" });
  } catch (err) {
    res.status(500).json({ message: "Error resolving complaint" });
  }
};

// Vote complaint
export const voteComplaint = async (req, res) => {
  const { id } = req.params;
  const { voteType } = req.body;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });
    console.log(complaint,req.user.userid)
    if (complaint.voters.includes(req.user.userid)) {
      return res.status(400).json({ message: "Already voted" });
    }

    if (voteType === "upvote") {
      complaint.votes += 1;
    } else if (voteType === "downvote") {
      complaint.votes -= 1;
    } else {
      return res.status(400).json({ message: "Invalid voteType" });
    }

    complaint.voters.push(req.user.userid);

    if (complaint.votes >= 10 && !complaint.punishment) {
      complaint.punishment = generatePunishment(complaint.type);
    }

    await complaint.save();
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Error voting complaint" });
  }
};



// Generate punishment text
function generatePunishment(type) {
  switch (type) {
    case "Noise":
      return "You owe everyone samosas for blasting loud music!";
    case "Cleanliness":
      return "You are on dish duty for a week!";
    case "Bills":
      return "You cover the next coffee run!";
    case "Pets":
      return "You clean the litter box for a week!";
    default:
      return "You do everyone’s chores for a week!";
  }
}
