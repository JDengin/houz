import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
//import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/postModels.js';

dotenv.config();

/* cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}); */

export const getAllPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 4; //LIMIT here is the number of page displayed per page
        const startIndex = (Number(page) - 1) * LIMIT;//Get the starting index of every page
        
        const total = await Post.countDocuments({});//Total number of posts inside the DB
       
        const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        //sort({_id : -1}) means sort by descending order of _ids
        //the skip() method is used to specify the number of documents to skip
        //Math.ceil retourne l'entier le plus proche arrondi par excès
        res.status(200).json({posts, currentPage: Number(page) || 1, numberOfPages: Math.ceil(total / LIMIT)});
        
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
    const { searchQuery, page } = req.query

    try {
            const LIMIT = 4; //LIMIT here is the number of page displayed per page
            const startIndex = (Number(page) - 1) * LIMIT;//Get the starting index of every page
            let allPosts
            let posts

            //Find a better way to count document matching the given searchQuery in the code below
                
            if (isNaN(searchQuery)) {
                const title = new RegExp(searchQuery, "i");// "i" is a modifier for insensitive case 
                allPosts = await Post.find({$or: [{town : title}, {quarter : title}, {homeType: title}, {homeDescription: title} ]}); //return all posts matching the given searchQuery
                posts = await Post.find({$or: [{town : title}, {quarter : title}, {homeType: title}, {homeDescription: title} ]}).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);//return the post for one page
            } else {
                const title = searchQuery;
                allPosts = await Post.find({ price: title })//return all posts matching the given searchQuery
                posts = await Post.find({ price: title }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);//return the post for one page
            }         
            
            const totalPostNumber = allPosts.length;
            //console.log(totalPostNumber)
            //const posts = await allPosts.sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

            res.status(200).json({posts, currentPage: Number(page) || 1, numberOfPages: Math.ceil(totalPostNumber / LIMIT)});

    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}

//Get the posts/Homes I've created (those with the userid of the person connected)
export const getMyHomes = async (req, res) => {
    const { userid, page } = req.query

    try {
            const LIMIT = 4; //LIMIT here is the number of page displayed per page
            const startIndex = (Number(page) - 1) * LIMIT;//Get the starting index of every page
            let allPosts
            let posts           

            //Find a better way to count document matching the given searchQuery in the code below
               
            allPosts = await Post.find({postCreator : userid}); //return all posts matching the given searchQuery
            posts = await Post.find({postCreator : userid}).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);//return the post for one page   
            
            const totalPostNumber = allPosts?.length;
            //console.log(totalPostNumber)
            //const posts = await allPosts.sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

            res.status(200).json({posts, currentPage: Number(page) || 1, numberOfPages: Math.ceil(totalPostNumber / LIMIT)});

    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}

export const createPost = async(req, res) => {
    
    const filenameArray = req.files.map((img) => img.filename) //copy all the files filename inside array filenameArray

    const posts = req.body
    const newPost = new Post({...posts, createdAt: new Date().toISOString(), postImages: filenameArray });
   
    try {
        await newPost.save();

        res.status(201).json({ message:"Post created", newPost});     
    } catch (error) {
        res.status(409).json({ message: error.message });        
    }   
}

export const deletePost = async(req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const result = await Post.findByIdAndDelete(id);

        if(result){
            return res.status(200).json({message: "Post deleted successfully."})
        } else {
            return res.status(404).send(`No post with id: ${id}`);
        }        
        
    } catch (error) {
        res.status(409).json({ message: error.message });        
    }
}

export const updatePost = async(req, res) => {

    const { id } = req.params;
    const updatedPost = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)
    
    const result = await Post.findByIdAndUpdate(id, updatedPost, {new: true}); //Option  "new: true" allows to return the document after updating, "new: false" return the doc before updating. "new: false" is the default value
    
    if(result){
        res.status(200).json({result, message: `Your post with id: ${id} has been updated`});
    } else {
        res.status(400).json({message: "Something went wrong"})
    }
    try {
        
    } catch (error) {
        res.status(409).json({ message: error.message });        
    }
}