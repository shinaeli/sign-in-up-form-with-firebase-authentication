import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const SignIn = () => {
  // Create a state to store the email and password provided by the user as an object called 'login'
  // Initialize 'login' as an empty object
  const [login, setLogin] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 'signInWithEmailAndPassword' checks to confirm if the email and password provided by the user correlates with that stored in the database
      // 'signInWithEmailAndPassword' accepts 'auth' instance, email and passowrd provided by the user as its arguments
      const userCredential = await signInWithEmailAndPassword(auth, login.email, login.password);
      console.log(userCredential);
      toast.success("You are welcome!", {
        position: toast.POSITION.TOP_CENTER
      })
      navigate("/welcome");
    } catch (error) {
      console.log(error.message, error.code);
      toast.error(`Error: ${error.code}`, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }



  return (
    <div className="out-form-container">
        <div className="title">
          <h1 className="logo">Grey<span>Haze</span></h1>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label>Email</label>
                <input 
                value={login.email} 
                type="text" 
                name="email" 
                id="email" 
                onChange={e => setLogin({...login, "email": e.target.value})} />
            </div>
            <div className="form-field">
                <label>Password</label>
                <input 
                value={login.password} 
                type="password" 
                name="password" 
                id="password" 
                onChange={e => setLogin({...login, "password": e.target.value})} />
            </div>
            <p className="new-user">Don't have an account? <Link to="/">Sign Up</Link></p>
            <button className="form-button" type="submit">Continue</button>
        </form>
        <ToastContainer />
        <p className="copyright">&copy;2023. Made by Omotosho E. Oluwasina.</p>
    </div>
  )
}

export default SignIn