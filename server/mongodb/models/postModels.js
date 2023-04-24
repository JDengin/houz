import mongoose from 'mongoose';
import User from './userModels.js';


const postSchema = new mongoose.Schema({
    /* user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },  */
    //postCreator here is the userid of the person who create the post
    postCreator: {
        type: String,
        required: true
    },
    postImages: { 
        type: [String], 
        default: [] 
    },
    homeType: String,
    price: Number,
    monthsNumber: Number,
    rentDeposit: Number,
    town: String,
    quarter: String,
    phoneNumber1: Number,
    phoneNumber2: Number,
    homeDescription: String,
    //filesImg: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }

});

export default mongoose.model("Post", postSchema);