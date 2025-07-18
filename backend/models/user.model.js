import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { 
      type: String, 
      required: true, 
      minlength: [6, "Password must be at least 6 characters long"] 
    },
    karmaPoints: { type: Number, default: 0 },
  },
  { timestamps: true } 
);

const User = mongoose.model("User", userSchema);

export default User;




