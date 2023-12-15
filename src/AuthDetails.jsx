import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from './firebase';
import WelcomePage from './components/WelcomePage';
import SignIn from './components/SigIn';

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user !== null) {
        console.log(user);
        setAuthUser(user);
      } else {
        console.log(user);
      }
    })
    return () => console.log('Authentication ran successfully!');
  }, []);


  return (
    <div>{authUser ? <WelcomePage /> : <SignIn />}</div>
    // <div>{authUser ? <WelcomePage authUser={authUser} /> : <SignIn />}</div>
  )
}

export default AuthDetails