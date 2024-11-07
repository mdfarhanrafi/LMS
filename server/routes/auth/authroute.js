import express from "express"
import AuthController from "../../Controller/auth/authcontroller.js"
import authenticate from "../../Middleware/authmiddleware.js"
const router = express.Router()


router.post("/registerUser",AuthController.register).post("/loginUser",AuthController.login) 
router.get("/check-auth", authenticate, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        data: {
            user,
        },
    });
})







export default router