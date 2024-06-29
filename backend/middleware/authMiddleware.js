import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = res.cookie.jwt;

    if (!token) {
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }catch(error){
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        
        }
    }
    else{
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

//Admin middleware

const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}

export {protect,admin}  ;