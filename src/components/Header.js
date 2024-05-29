import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utilities/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utilities/userSlice';


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
const user = useSelector((store)=> store.user);

const handleSignOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
   
  }).catch((error) => {
    // An error happened.
    navigate('/error')
  });
}
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email:email, displayName:displayName, photoURL:photoURL}))
       navigate('/browse')
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser())
        navigate('/')
      }
    });


    return () => unsubscribe()
}, [])
  return (
    <div className='w-screen absolute top-0 bg-gradient-to-b from-black to-transparent flex justify-between items-center p-4 z-10'>
      <img src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt='logo' className='w-1/6 h-24 ml-10'></img>
   
  {user && (  <div className='flex items-center'>
      <img
      className='w-12 h-12 '
      alt='usericon'
      src={user?.photoURL}
     />

     <button onClick={handleSignOut} className='font-bold text-white ml-4'>(Sign Out) </button>

      
    </div>)}
    </div>
  )
}

export default Header