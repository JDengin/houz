import mongoose from 'mongoose';
import User from './userModels.js';


const postSchema = new mongoose.Schema({
    /* user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },  */

    postCreator: {
        type: String,
        required: true
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