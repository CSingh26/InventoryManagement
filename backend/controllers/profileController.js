const prisma = require("../config/prismaClient")

const sharp = require("sharp")

// create profile
exports.createProfile = async (req, res) => {
    const userId = req.userId

    try {
        console.log("Body:", req.body)
        console.log("File:", req.file)

        const { Iname, IcompanyName } = req.body
        // Ensure the user exists
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            })
        }

        const existingProfile = await prisma.profile.findUnique({
            where: { userId },
        })
        
        if (existingProfile) {
            return res.status(400).json({
                error: "Profile already exists",
            })
        }

        let compressedImageBuffer = null

        if (req.file) {
            compressedImageBuffer = await sharp(req.file.buffer)
                .resize(300)
                .jpeg({
                    quality: 75
                })
                .toBuffer()
        }

        const newProfile = await prisma.profile.create({
            data: {
                userId,
                name: Iname,
                companyName: IcompanyName,
                profilePicture: compressedImageBuffer
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