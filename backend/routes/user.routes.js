import express from "express";
import { createUser ,loginUser,getUserById,} from "../controllers/userController.js";
import auth from "../middlewares/JwtAuth.js";


const userRoutes = express.Router();


userRoutes.post("/register", createUser)

userRoutes.post("/login",loginUser);


userRoutes.get("/getUserById/:id",auth,getUserById);


userRoutes.get("/checkAuth", auth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email });
});



export default userRoutes;
