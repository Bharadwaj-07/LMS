const express=require("express")
const {availability,login,store}=require('../Controller/ProfileController')
const router=express.Router()

router.post("/check",availability);
router.post("/login",login);
router.post("/store",store);
module.exports = router