const express=require("express")
const {availability,login}=require('../Controller/ProfileController')
const router=express.Router()

router.post("/check",availability);
router.post("/login",login);
module.exports = router