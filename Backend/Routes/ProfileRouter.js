const express=require("express")
const {availability,login,store,getCourses}=require('../Controller/ProfileController')
const router=express.Router()

router.post("/check",availability);
router.post("/login",login);
router.post("/store",store);
router.post("/getCourses",getCourses);
module.exports = router