const prisma = require("../config/prismaClient")

// create profile
exports.createProfile = async (req, res) => {
    const { name, companyName, profilePicture } = req.body
    const userId = req.userId

    try {
        // Ensure the user exists
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            })
        }

        const newProfile = await prisma.profile.create({
            data: {
                userId,
                name,
                companyName,
                profilePicture
            }
        })

        res.status(201).json({
            message: "Profile created successfully!",
            profile: newProfile
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            error: "Failed to create profile.",
            details: e.message
        })
    }
}

//update profile
exports.updateProfile = async (req, res) => {
    const { name, companyName, profilePicture } = req.body
    const userId = req.userId

    try {
        const userProfile = await prisma.profile.findUnique({
            where: { userId }
        })

        if (!userProfile) {
            return res.status(404).json({
                error: "User profile not found"
            })
        }

        const updateProfile = await prisma.profile.update({
            where: { userId },
            data: {
                name,
                companyName,
                profilePicture
            }
        })

        res.status(200).json({
            message: "User profile updated successfully!"
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            error: "Failed to update",
            error: e
        })
    }
}

//fetch profile
exports.getProfile = async (req, res) => {
    const userId = req.userId

    try {
        const profile = await prisma.profile.findUnique({
            where: { userId },
            include: { user: true}
        })

        if (!profile) {
            return res.status(404).json({
                error: "Profile not found!"
            })
        }

        res.status(200).json({
            profile
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            error: "Failed to fetch profile",
            error: e
        })
    }
}