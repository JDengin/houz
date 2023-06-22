//This file is for the front-end of Sign up/Sign in page

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import houz_logo from '../assets/houz_logo.png';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { register, login, reset } from '../features/auth/authSlice';
import Spinner from "../components/Spinner";

const Auth = () => {

  const [inputs, setInputs] = useState({});
  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const { userName, email, password, confirmPassword } = inputs;
  
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError) {
      toast.error(message);
    } 

    if(isSuccess || user) {
      navigate('/');
    }  

    dispatch(reset());
    
  }, [user, isError, isSuccess, message, navigate, dispatch])
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}));
    //setFormData({ ...formData, [name]: value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    //Means if SIGN UP form
    if(isSignUp){ 

        if(inputs.password !== inputs.confirmPassword) {
          toast.error("Passwords doesn't match")
        } else {
          const userData = { userName, email, password }

          dispatch(register(userData));
        } 
    //Or if SIGN IN form  
    } else {
      const userData = { email, password } 

      dispatch(login(userData))

    }

  }

  const togglePassword = (e) => {
    e.preventDefault();
    passwordType == 'password' ? setPasswordType((prevPasswordType) => prevPasswordType = 'text' ) : setPasswordType((prevPasswordType) => prevPasswordType = 'password' );
    setIsPassword((prevIsPassword) => !prevIsPassword);
  } 

  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    confirmPasswordType == 'password' ? setConfirmPasswordType((prevConfirmPasswordType) => prevConfirmPasswordType = 'text' ) : setConfirmPasswordType((prevConfirmPasswordType) => prevConfirmPasswordType = 'password' );
    setIsConfirmPassword((prevIsConfirmPassword) => !prevIsConfirmPassword);
  }

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => (!prevIsSignUp)) ; 
    setInputs({});
  }

  if(isLoading) {
    return <Spinner/>
  }
  

  return (
    <>
        <header className="bg-[#1B4571] w-full h-[75px] flex justify-center items-center">
            <Link to="/">
              <img src={houz_logo} alt="logo" className="w-[125px] h-[75px]"/>
            </Link>
        </header>

        <main className="flex justify-center">
          <div className="flex justify-center drop-shadow-lg flex-col mt-20 w-[400px] lg:w-[600px] bg-slate-300 border-2 h-fit px-10 py-5">
            <p className="flex justify-center text-2xl font-semibold mb-3">
              {isSignUp ? 'Sign up' : 'Sign in' }
            </p>
            <form onSubmit={handleSubmit}>
              { isSignUp && (
                <input type="text" name="userName" value={inputs.userName || ""} onChange={handleChange} placeholder="Enter your username*" required
                  className='w-[225px] sm:w-[300px] lg:w-[500px] h-[40px] px-4 text-lg my-2'               
                />
              )}
              <input type="email" name="email" value={inputs.email || ""} onChange={handleChange} placeholder="Enter your email*" required
                className='flex justify-center w-[225px] sm:w-[300px] lg:w-[500px] h-[40px] px-4 text-lg  my-2'               
              />

              <input type={passwordType} name="password" value={inputs.password || ""} onChange={handleChange} placeholder="Enter your password*" required
                className='w-[225px] sm:w-[300px] lg:w-[500px] h-[40px] px-4 text-lg  my-2'               
              />
              
              <button className='relative right-6' onClick={togglePassword}>
                {isPassword ? <AiFillEyeInvisible/> : <AiFillEye/> }
              </button>


              { isSignUp && (
                <>
                  <input type={confirmPasswordType} name="confirmPassword"value={inputs.confirmPassword || ""} onChange={handleChange} placeholder="Confirm your password*" required
                    className='w-[225px] sm:w-[300px] lg:w-[500px] h-[40px] px-4 text-lg  my-2'               
                  />                
                  <button className='relative right-6' onClick={toggleConfirmPassword}>
                      {isConfirmPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}
                  </button>
                </>
              )}

              <button type="submit" className='bg-[#1B4571] w-[225px] sm:w-[300px] lg:w-[500px] h-[40px] my-2 text-white hover:bg-sky-500'>
                  { isSignUp ? 'Sign up' : 'Sign in' }
              </button>    

              <button onClick={switchMode} className='hover:text-sky-400'>
               {isSignUp ? "Already have an account ? Sign In " : "Don't have an account ? Sign Up"}
              </button> 

            </form>
          </div>
          
        </main>
    </>
  )
}

export default Auth

