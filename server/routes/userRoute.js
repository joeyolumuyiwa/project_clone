import express from "express";
import { signUpController, loginController, emailConfirmationHandler, resetPasswordController, changePasswordController, PasswordRecoveryController } from "../controllers/userControllers.js"
import { singleProfileDetails, updateProfileController } from "../controllers/profileControllers.js"
import {authorizationHandler} from "../middlewares/authorization.js"
import {passwordConfirmHandler} from "../middlewares/passwordConfirmHandler.js"
import multer from "multer"
import cloudinary from "cloudinary"

const upload = multer({dest: 'images'})

const router = express.Router();

router.post("/signup", passwordConfirmHandler, signUpController)
router.get('/confirm-email/:token', emailConfirmationHandler)
router.post("/login", loginController)
router.get('/profile-details', authorizationHandler, singleProfileDetails)
router.put("/update-profile",  authorizationHandler,  updateProfileController)
router.post("/reset-password", resetPasswordController)
router.put("/reset-password", PasswordRecoveryController)
router.put("/change-password", authorizationHandler, changePasswordController)
/* router.get("/get-users", authorizationHandler, getUsers); */

export default router;
