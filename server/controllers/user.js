import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../mongodb/models/userModels.js';

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {    
      // Check for user email
      const user = await User.findOne({ email })
    
      if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
          _id: user.id,
          UserName: user.userName,
          email: user.email,
          message: `Connected to ${user.userName} account`,
          token: generateToken(user._id),
        })
      } else {
        res.status(400).json({ message: 'Invalid email or password'})
        //throw new Error('Invalid email or password')
      }
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
      //throw new Error('Invalid credentials')
    }
}

export const signup = async (req, res) => {
    const { userName, email, password, confirmPassword } = req.body
  
    try {

      if (!userName || !email || !password || !confirmPassword) {
        res.status(400)
        throw new Error('Please add all fields')
      }
 
      if( password !== confirmPassword ) {
       return res.status(400).json({ message: "Passwords don't match" })
       // throw new Error('Enter the same password for confirmation')
      } 
    
      // Check if user exists
      const userExists = await User.findOne({ email })
    
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' })
        //throw new Error('User already exists')
      }
    
      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
    
      // Create user
      const user = await User.create({
        userName,
        email,
        password: hashedPassword,
      })
    
      if (user) {
        return res.status(201).json({
          _id: user.id,
          name: user.userName,
          email: user.email,
          message: 'User created in the database',
          token: generateToken(user._id) 
        })
      } else {
        return res.status(400).json({ message: 'Invalid user data'})
       // throw new Error('Invalid user data')
      }
      
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' })
    } 
      
}

//Generate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h'})
}
