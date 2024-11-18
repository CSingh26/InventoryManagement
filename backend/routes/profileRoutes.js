const express = require("express")
const router = express.Router()
const profileController = require("../controllers/profileController")
const authToken = require("../middleware/authMiddleware")

router.post(
    "/create", authToken, profileController.createProfile
)

router.put(
    "/update", authToken, profileController.updateProfile
)

router.get(
    "/get", authToken, profileController.getProfile
)

module.exports = router