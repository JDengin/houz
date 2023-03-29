import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
//import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/postModels.js';
import postModel from '../mongodb/models/postModels.js';

dotenv.config();

/* cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}); */

export const getAllPosts = async (req, res) => {

    try {
        const posts = await Post.find({});

        res.status(200).json(posts);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
}

export const getSelectedPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        res.status(200).json(post);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostBySearch = async (req, res) => {
    const { searchedQuery } = req.query

    try {
                
            if (isNaN(searchedQuery)) {
                const title = new RegExp(searchedQuery, "i");// "i" is a modifier for insensitive case 
                const posts = await Post.find({$or: [{town : title}, {quarter : title}, {homeType: title}, {homeDescription: title} ]});
                res.status(200).json({ posts })
            } else {
                const title = searchedQuery;
                const posts = await Post.find({ price: title })
                res.status(200).json({ posts })
            }            

    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}


export const createPost = async(req, res) => {

    const post = req.body;
    const newPostModel = new postModel({...post, createdAt: new Date().toISOString() });
    
    try {
        await newPostModel.save();

        res.status(201).json(newPostModel);     
    } catch (error) {
        res.status(409).json({ message: error.message });        
    }
}