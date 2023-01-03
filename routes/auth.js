import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { createError } from "./../error.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register a user
// api : api/auth/signup

router.post("/signup", async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();

    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
});

// login a user
// api : api/auth/signin

router.post("/signin", async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) {
      return next(createError(400, "Wrong Credentials"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;
    res.cookie("access_token", token).status(200).json(others);
  } catch (err) {
    next(err);
  }
});

// google auth
// api : api/auth/google

router.get("/google", (req, res) => {
  res.json("its successfull");
});

export default router;
