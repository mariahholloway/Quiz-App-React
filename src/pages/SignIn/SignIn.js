import React, {useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase.js';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import './SignIn.css';

const SignIn = ({setShouldShowSignIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState(null);
  const genericError = "An  error occurred while signing you in, please try again.";
  const [name, setName] = useState("");
  const history = useNavigate();
  const [signUpError, setSignUpError] = useState(null);


  const doSignIn = () => {
    setSignInError(null);
    if (!email  || !password) {return;}
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        let displayMessage = genericError;
        if(errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
             displayMessage = "Incorrect Username or Password";
        }
        else if(errorCode === "auth/invalid-email") {
            displayMessage = "Invalid email address";
        }
        setSignInError(displayMessage);
    });
  } 

  const doSignUp = () => {
    setSignUpError(null);
    if (!email  || !password || !name) {return;}
    auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            result.user.updateProfile({
                displayName: name
            }).then(() => {
            }, (e) => {
                setSignUpError(genericError);
                console.log(e)
        });     
        })
        .catch((e) => {
        let displayMessage = genericError;
        if (e.code === 'auth/email-already-in-use'){
            displayMessage = "Email address already in use";
        }
        setSignUpError(displayMessage);
        console.log(e)
    });
  }

  const doGoogleSignUp = () => {
    setSignUpError(null);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
      setSignUpError(genericError);
    });
}

  return (
      <div className="page-container">
      <div>
      <div className="signin-box" onSubmit={(e) => {doSignUp(e)}}>
            <div className="box-header">Welcome Back!</div>
              {signInError ? <div className="log-sign-error">{signInError}</div> : <></>}
              <TextField label="Email address" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button variant="outlined" onClick={doSignIn}><b>Sign me in</b></Button>
          </div>
          <div className="signin-box2">
            <Button variant="outlined" onClick={(e) => {e.preventDefault();history("/signup"); setShouldShowSignIn(false);}}><b>I don't have an account</b></Button>
            <Button variant="outlined" onClick={doGoogleSignUp}><b>Sign Up with Google</b></Button>
            <Button variant="outlined" onClick={() => auth.signOut()}><b>Sign Out</b></Button>
          <div className="box-header">
            <Button variant="outlined" color="secondary"> <Link to="/">Quiz Home</Link></Button>
          </div>
          </div>
          
    </div>
    </div>
  );
}

export default SignIn;