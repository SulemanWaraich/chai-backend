import {Router} from "express";
import {registerUser} from '../controllers/user.controller.js';
import {upload} from "../middlewares/multer.middleware.js";
import { loginUser, logOutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1
    },
    {
      name: "coverImage",
      maxCount: 1
    },
  ]),
  registerUser
)

router.route("/logIn").post(loginUser);

// Secured Routes
router.route("/logOut").post(verifyJWT ,logOutUser);

export default router;