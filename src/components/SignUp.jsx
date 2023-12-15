import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../firebase'
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  // Create a state to store the email and password provided by the user as an object called 'details'
  // Initialize 'details' as an empty object
  const [details, setDetails] = useState({})
  // Create a state to store the current state of the checkbox 'isChecked'
  // Initialize 'isChecked' as false
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const checkEmail = x => {
    // Checks if the email provided ends with a ".com" and doesn't contain an empty space
    if((x.slice(-4) === '.com') && (!x.includes(" "))) {
        return true;
    } else {
        return false;
    }
  }

  const checkPassword = x => {
    // Checks if the password provided contains alphanumeric characters or underscore
    return /\w/gi.test(x);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if((details.email && checkEmail(details.email)) && (details.password && checkPassword(details.password)) && (isChecked)) {
        // An id called "uid" is created for each user
        const uid = new Date().getMilliseconds();
        // The id created is stored as a value with the proprty name "id" in the object 'details'
        setDetails({"id": uid, ...details});
        let postObject = details;

        // Add a new document in collection "users"
        // Create a database reference called "dbRef" to keep track of collection "users"
       const dbRef = collection(db, "users");
      //  'addDoc' is an asynchronous action, so invoke it in a try-catch
       try {
        // A document reference 'docRef' is also created when 'addDoc' function is called
        // 'addDoc' accepts database reference 'dbRef' and the data to be added as its arguments
        const docRef = await addDoc(dbRef, {...postObject});
        // Call "id" property on the document reference to get its unique id
        // This unique id is provided by firebase
        console.log(`Document with id: ${docRef.id} successfully submitted.`);
       } catch (error) {
          console.log(error.message, error.code);
       }

      //  Creating User with Email and Password via Firebase Authentication
      try {
        // 'createUserWithEmailAndPassword' stores the email and password provided by the user in a database for authentication
        // 'createUserWithEmailAndPassword' accepts "auth" instance, email and password provided by the user as its arguments
        // 'createUserWithEmailAndPassword' returns an object called 'ueserCredential' which contains all user details
        const userCredential = await createUserWithEmailAndPassword(auth, details.email, details.password);
        console.log(userCredential);
        toast.success("You've been successfully registered.", {
          position: toast.POSITION.TOP_CENTER
        })
      } catch (error) {
        console.log(error.message, error.code);
        toast.error(`Error encountered: ${error.code}`, {
          position: toast.POSITION.TOP_CENTER
        })
      }
        console.log(details);
        // Clears out the email and password once the data are submitted
        setDetails({...details, "email": "", "password": ""});
        setIsChecked(false);
        navigate("/sign-in");
    }
  }

  return (
    <div className="out-form-container">
        <div className="title">
            <h1 className="logo">Grey<span>Haze</span></h1>
            <p className="check-existing-user">Create a free account or <Link to="sign-in">log in</Link></p>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label>Email</label>
                <input 
                value={details.email} 
                type="email" 
                name="email" 
                id="email" 
                onChange={e => setDetails({...details, "email": e.target.value})} />
            </div>
            <div className="form-field">
                <label>Password</label>
                <input 
                value={details.password} 
                type="password" 
                name="password" 
                id="password" 
                onChange={e => setDetails({...details, "password": e.target.value})} />
            </div>
            <div className="form-check-field">
                <input 
                className='check' 
                value={isChecked} 
                type="checkbox" 
                name="terms" 
                id="terms" 
                onChange={e => setIsChecked(e.target.checked)} />
                <p className="check-text">I don't want to receive emails about GreyHaze and related product 
                    and feature updates, marketing best practices, and promotions from GreyHaze.
                </p>
            </div>
            <p className='form-footer'>By creating an account, you agree to our <Link to="/">Terms</Link> and have read and acknowledge the <Link to="/">Global Privacy Statement</Link>.</p>
            <button className="form-button" type="submit">Sign Up</button>
        </form>
        <ToastContainer />
        <p className="copyright">&copy;2023. Made by Omotosho E. Oluwasina.</p>
    </div>
  )
}

export default SignUp