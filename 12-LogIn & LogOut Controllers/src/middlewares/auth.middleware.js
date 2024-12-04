import {asyncHandler} from "../utils/asyncHandler.js";
import {userModel} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js"
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler( async(req, res, next) => {
    const token = req.cookies.AccessToken || req.header("Authorization")?.replace("Bearer ", "");

    if(!token){
      throw new ApiError(401, "Unauthorized request")
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await userModel.findById(decodedToken?._id).select("-password -refreshToken");

    if(!user){
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
})