const express = require("express")
const router = express.Router()
const profileController = require("../controllers/profileController")
const authToken = require("../middleware/authMiddleware")
const upload = require("../utils/multer")

router.post(
    "/create",
    authToken, 
    upload.single("profilePicture"), 
    profileController.createProfile
)

router.put(
    "/update", 
    authToken,
    upload.single("profilePicture"), 
    profileController.updateProfile
)

router.get(
    "/get", 
    authToken,
    profileController.getProfile
)

module.exports = router