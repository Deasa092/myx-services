const express = require("express")
const { getUserController, updateUserController, resetPasswordController, deleteProfileController } = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()

//router
//GET USER
router.get("/getUser", authMiddleware, getUserController);
router.put("/updateUser", authMiddleware, updateUserController)
router.post("/resetPassword", authMiddleware, resetPasswordController)
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController)
module.exports = router