import express from "express";
import { verifyToken } from "./../verifyToken.js";
import { createError } from "./../error.js";
import User from "../models/User.js";

const router = express.Router();

// Update User
// method : PUT
//  api : api/users/:id

router.put("/:id", verifyToken, async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: res.body,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can only update your account."));
  }
});

// Register User
// method : POST
//  api : api/users/:id

router.post("/:id", (req, res, next) => {
  res.json("its successfull");
});

// get User
// method : GET
//  api : api/users/test

router.get("/find/:id", (req, res, next) => {
  res.json("its successfull");
});

// delete an existing User
// method : DELETE
//  api : api/users/test

router.delete("/:id", (req, res, next) => {
  res.json("its successfull");
});

// subscribe a video
// method : PUT
//  api : api/users/test

router.put("/sub/:id", (req, res, next) => {
  res.json("its successfull");
});

// unsubscribe a video
// method : PUT
//  api : api/users/test

router.put("/unsub/:id", (req, res, next) => {
  res.json("its successfull");
});

// like a video
// method : PUT
//  api : api/users/test

router.put("/like/:videoId", (req, res, next) => {
  res.json("its successfull");
});

// dislike a video
// method : PUT
//  api : api/users/test

router.put("/dislike/:videoId", (req, res, next) => {
  res.json("its successfull");
});

export default router;
