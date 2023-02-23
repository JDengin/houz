import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: { 
        type:  String, 
        required: [true, 'Please add an username']
    },
    email: { 
        type:  String, 
        required: [true, 'Please add an email address'],
        unique: true
    },
    password: { 
        type:  String, 
        required: [true, 'Please add a name']
    },
},
{
    timestamps: true
});

export default mongoose.model("User", userSchema);