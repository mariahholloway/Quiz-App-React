import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import '../SignIn/SignIn.css';

const SignUp = ({setShouldShowSignIn}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState(null);
  const history = useNavigate();

    
  const genericError = "An  error occurred while signing you up, please try again.";
    
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
  
  
  return (
      <div className="page-container">
      <div>
          <div className="signin-box" onSubmit={(e) => {doSignUp(e)}}>
              <div className="box-header">Registration</div>
              {signUpError ? <div className="log-sign-error">{signUpError}</div> : <></>}
              <TextField label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField label="Email address" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button variant="outlined" to="/" onClick={doSignUp}><b>Sign me up</b></Button>
          </div>
          <div className="signin-box2">
              <Button variant="outlined" onClick={(e) => {e.preventDefault();history("/signin"); setShouldShowSignIn(true);}}><b>I have an account</b></Button>
            <div className="box-header">
              <Button variant="outlined" color="secondary"><Link to="/">Quiz Home</Link></Button>
            </div>
          </div>
    </div>
    </div>
  );
}

export default SignUp;