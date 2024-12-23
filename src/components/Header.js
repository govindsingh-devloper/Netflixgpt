import { signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../utilis/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utilis/userSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { LOGO, SUPPORTED_LANGUAGES } from '../utilis/constants'
import { toggleGptSearch } from '../utilis/gptSlice'
import { changeLanguage } from '../utilis/configSlice'


const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector(store=>store.user);

  const showGptSearch=useSelector(store=>store.gpt.showGptSearch)



  const handlesignout=()=>{
    signOut(auth).then(()=>{
     navigate("/")
    }).catch((error)=>{
      navigate("/error")
    })
  }

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(user)=>{
      if(user){
        const {uid,email,displayName,photoURL}=user;
        dispatch(addUser({uid:uid,
          email:email,
          displayName:displayName,
          photoURL:photoURL})
        );
        navigate("/browse")
        
      }else{
        dispatch(removeUser());
        navigate("/")
       
      }
    })

    //Unsubsribe when component unmounts
    return ()=>unsubscribe();

  },[]);


  const handleGptSearch=()=>{
    //Toggle GPT Search
    dispatch(toggleGptSearch())
  }

  const handleLanguageChange=(e)=>{
    console.log(e.target.value)
    dispatch(changeLanguage(e.target.value))

  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img 
      className='w-44'
       src={LOGO}
        alt='logo'
      />

      {user&& (
        <div className='flex p-2'>

       { showGptSearch && (
        
        <select 
        className='p-2 m-2 bg-gray-900 text-white'
        onChange={handleLanguageChange}
        >
        {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
       
        </select>
      )}
        <button
        onClick={handleGptSearch} 
        className='py-2 px-4 mx-2 my-2 bg-purple-800 text-white rounded-lg'>

        {showGptSearch ? "Home Page" :"GPT Search"}
        
   
        
        </button>
        <img
         className='w-12 h-12' 
          alt='user-icon'
          src={user.photoURL}
        />
        <button 
        onClick={handlesignout}
        className='font-bold text-white'>Signout</button>
      </div>
      )}

      
    </div>
  )
}

export default Header