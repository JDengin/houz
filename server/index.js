import express from 'express';
//import fileupload from 'express-fileupload';
import * as dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { createPost } from './controllers/post.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));//The .urlencoded indicates that we are parsing URL-encoded data for the front end of our application.

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from Houz!',
    });
});

/*____________MULTER____________*/

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

/*____________MULTER_____________*/

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(process.env.PORT, () => console.log('Server started on port 8080'));
      } catch (error) {
        console.log(error);
      }
};
    
startServer();

