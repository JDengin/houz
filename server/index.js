import express from 'express';
//import fileupload from 'express-fileupload';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import nodemailer from 'nodemailer';
//import sendEmail from './utils/sendEmail.js'
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { createPost } from './controllers/post.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));//The .urlencoded indicates that we are parsing URL-encoded data for the front end of our application.

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from Houz!',
    });
});

/*____________BEGINNING OF MESSAGE_SENDING____________*/

// Nodemailer configuration for email receiving
const transporter = nodemailer.createTransport({
    service: 'gmail', // Using my email service provider. I could have also been "yahoo, hotmail" or some stuff like that
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN, 
      
    }, 
});

app.post("/api/receiveEmail", async(req, res) => {
  const {subject, email, message} = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: subject,
    //text: message,
    html: ` 
            <p>${message}</p>
            <p> This message has been sent by : ${email} </p> 
          `
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent successfully: ' + info.response);
    }
  }); 
});

/*****____________END OF NODEMAILER CONFIGURATION FOR MESSAGE_RECEIVING____________*****/


/*____________BEGINNING OF MULTER FOR FILES UPLOADING____________*/

const storage = multer.diskStorage({
  destination: function ( req, file, cb) {
    //cb(null, './uploads') //cb(null, __dirname + '/uploads')    //'./uploads'
    cb(null, '../client/public/uploads') //I send uploaded images into uploads_folder located inside public_folder because you can display them in front-end when they are inside public folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E19)
    const extension = file.originalname.split(".").pop()
    //cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, 'Img' + '-' + uniqueSuffix + '.' + extension)
  }  
}) 

const upload = multer({ storage: storage });

app.post('/posts/uploadPost', upload.array('postImages'), createPost);

//Find a way to limit the number of allowed images to upload at 10

/*****____________END OF MULTER_____________*****/

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(process.env.PORT, () => console.log('Server started on port 8080'));
      } catch (error) {
        console.log(error);
      }
};
    
startServer();

