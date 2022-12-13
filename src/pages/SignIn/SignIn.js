import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase.js';
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import './SignIn.css';
// import './App.css;'

const SignIn = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState(null);
  const genericError = "An  error occurred while signing you in, please try again.";
  
  // const doSignIn = () => {
  //   setSignInError(null);
  //   if (!email  || !password) {return;}
  //   auth.signInWithEmailAndPassword(email, password)
  //   .catch((error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       console.log(errorCode);
  //       console.log(errorMessage);
  //       let displayMessage = genericError;
  //       if(errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
  //            displayMessage = "Incorrect Username or Password";
  //       }
  //       else if(errorCode === "auth/invalid-email") {
  //           displayMessage = "Invalid email address";
  //       }
  //       setSignInError(displayMessage);
  //   });
  // } 

  const doGoogleSignIn = () => {
      setSignInError(null);
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
      .catch((error) => {
        console.error(error);
        setSignInError(genericError);
      });
  }
    
  return (
      <div className="page-container">
      <div>
      <div className="signin-box"> 
              <div className="box-header">Welcome Back!</div>
              {/* {signInError ? <div className="log-sign-error">{signInError}</div> : <></>}
              <TextField label="Email address" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button variant="outlined" onClick={doSignIn}>Sign me in</Button> */}
              <Button variant="outlined" onClick={doGoogleSignIn}><b>Sign In with Google</b></Button>
              <Button variant="outlined" onClick={() => auth.signOut()}><b>Sign Out</b></Button>
              {/* <Button variant="outlined" onClick={() => {setShouldShowSignIn(false);}}>I don't have an account</Button> */}
          
          </div>
          {/* <div>
              <Button variant="outlined" style={{ alignSelf: "center"}} onClick={doGoogleSignIn}>Sign In with Google</Button>
              <Button variant="outlined" onClick={() => {setShouldShowSignIn(false);}}>I don't have an account</Button>
          </div> */}
          <Link to="/">Quiz Home</Link>
    </div>
    </div>
  );
}

export default SignIn;