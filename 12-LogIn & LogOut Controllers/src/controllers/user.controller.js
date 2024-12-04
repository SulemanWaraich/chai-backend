import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {userModel} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await userModel.findById(userId);
        const AccessToken = user.generateAccessToken()
        const RefreshToken = user.generateRefreshToken()

        user.refreshToken = RefreshToken;
        await user.save({validateBeforeSave: false});

        return {AccessToken, RefreshToken};
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens");
    }
}

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend  
    // validation -- not empty  
    // check if user already exist: username or email  
    // check for images, check for avatar  
    // upload them to cloudinary, avatar  
    // create user object - create entry in db  
    // remove password and refresh token field from response  
    // check for user creation
    // return response  

    const {userName, fullName, password, email} = req.body;
    console.log("email, ", email);

    if([fullName, email, userName, password].some((fields) => fields?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await userModel.findOne({
        $or: [{userName}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;

    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage[0] > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await userModel.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase(),
    })
    
    const createdUser = await userModel.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

const loginUser = asyncHandler( async(req, res ) => {
    // req body -- data
    // username or email
    // find the user
    // password check
    // access and refresh tokens
    // send cookie

    const {userName, email, password} = req.body

    if(!userName || !email){
        throw new ApiError(400, "username or email required");
    }

    const user = await userModel.findOne({$or: [{email}, {userName}]});

    if(!user){
        throw new ApiError(404, "User doesn't exist.");
    }

    const validPassword = await user.isPasswordCorrect(password);

    if(!validPassword){
        throw new ApiError(401, "Wrong Password");
    }

    const {AccessToken, RefreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await userModel.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.
    status(200).
    cookie("accessToken", AccessToken ,options).
    cookie("refreshToken", RefreshToken, options).
    json(
        new ApiResponse(
            200,
            {user: loggedInUser, AccessToken, RefreshToken},
            "User logged In successfully."
        ));
})

const logOutUser = asyncHandler( async(req, res) => {
    await userModel.findByIdAndUpdate( req.user._id, {$set: {refreshToken: undefined}}, {new: true});

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"))
})

export {registerUser, loginUser, logOutUser}