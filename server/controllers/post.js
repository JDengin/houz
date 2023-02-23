import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/postModels.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createPostController = async(req, res) => {

    try {
        //const post = req.body;
        //let filesImg = req.files; 
        //console.log(req);
        console.log(req.body);
        console.log(req.files);
           
        res.json({status: "FILE received"});
        //let filesImgUrl = [];

        /* for (let i=0; i < filesImg.length; i++){

            const arrTemp = await cloudinary.uploader.upload(filesImg[i], {
                folder: "houzPostFolder"
            });

            filesImgUrl.push(arrTemp);
        } */
        //const filesImgUrl = await cloudinary.uploader.upload(req.body.filesImg);

        //const newPost = new Post({...post, filesImg: filesImgUrl.url, createdAt: new Date().toISOString()});

        //newPost = await newPost.create();

        //res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(409).json({ message: error.message });        
    }
}