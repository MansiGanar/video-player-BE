import express from "express";

const router = express.Router()

//  api : api/comments/test

router.get("/test", (req,res) => {
    res.json("its successfull")

})

export default router