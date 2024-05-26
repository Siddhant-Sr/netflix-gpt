import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidation } from '../utilities/validate';
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utilities/firebase';
import { useNavigate } from 'react-router-dom';
import Browse from './Browse';
import { useDispatch } from 'react-redux';
import { addUser } from '../utilities/userSlice';

const Login = () => {

  // Create a toggle button to convert sign in form into sign up form
  const [isSignIn, setIsSignIn] = useState(true); // Changed from array to boolean
  const [message, setMessage] = useState(null)
const navigate = useNavigate();
const dispatch = useDispatch()

  const name = useRef(null)
  const email = useRef(null);
  const password = useRef(null);

  

  const handleClick = () => {
    setIsSignIn(!isSignIn);
   // Accessing the current property to log the password input reference
  };

  const handleSubmit = (e) => {
  e.preventDefault()
  // console.log("Email:", email.current.value);
  // console.log("Password:", password.current.value);// Accessing the current property to log the password input reference


  setMessage(checkValidation(email.current.value, password.current.value))
  // First check validation
  // Second check SIgn UP or Sign in form
 if(message==null){

//Sign UP Logic
if(!isSignIn){
 
  createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name.current.value, photoURL: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
      }).then(() => {
        // Profile updated!
        const {uid, email, displayName, photoURL} = auth.currentUser;

        dispatch(addUser({uid: uid, email:email, displayName:displayName, photoURL:photoURL}))

       
        
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
   
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setMessage(errorCode + errorMessage)
      // ..
    });
  
}

// Sign in Logic
else{
  signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate("/browse")
    console.log("Logged IN");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setMessage(errorCode + errorMessage)
  });
}

    console.log("Validated");
  }else{
    
    console.log(message)
  }
  };

  return (
    <div
    style={{
    backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/c1366fb4-3292-4428-9639-b73f25539794/3417bf9a-0323-4480-84ee-e1cb2ff0966b/IN-en-20240408-popsignuptwoweeks-perspective_alpha_website_large.jpg")`,
    backgroundSize: 'cover', // Ensures the image covers the entire div
    backgroundPosition: 'center', // Centers the image
    height: '100vh', // Ensures the div takes up the full viewport height
    width: '100vw', // Ensures the div takes up the full viewport width
  }}
     >
      {/* <div className='absolute'> 
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/c1366fb4-3292-4428-9639-b73f25539794/3417bf9a-0323-4480-84ee-e1cb2ff0966b/IN-en-20240408-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='background' className='object-cover w-full h-full inset-0' />
      </div> */}

      <Header />
      <form onSubmit={handleSubmit} className='w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded'>
        <h1 className='font-bold text-3xl py-4'>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignIn && (
          <input
            ref={name}
            type='text'
            placeholder='Name'
            className='p-4 my-4 w-full bg-gray-700'
          />
        )}
        <input
          ref={email}
          type='text'
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-gray-700'
        />
        <input
          ref={password}
          type='password'
          placeholder='Password'
          className='p-4 my-4 w-full bg-gray-700'
        />
        <p> {message}</p>
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </button>
        <p className='py-4 cursor-pointer' onClick={handleClick}>
          {isSignIn ? 'New to Netflix? Sign Up Now' : 'Already registered? Sign In Now'}
        </p>
      </form>
    </div>
  );
};

export default Login;
