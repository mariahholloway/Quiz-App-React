import { Button, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrrorMessage/ErrorMessage";
import Categories from "../../data/Categories";
import { auth } from '../../firebase.js';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./Home.css";

const Home = ({ fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const setSignInError = useState(null);
  const genericError = "An  error occurred while signing you in, please try again.";

  auth.onAuthStateChanged((user) => {
     setCurrentUser(user);
  }); 

  const doGoogleSignIn = () => {
    setSignInError(null);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .catch((error) => {
      console.error(error);
      setSignInError(genericError);
    });
  }
  
  // const name = auth.currentUser.displayName;
  const history = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty ) {
      // if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      fetchQuestions(category, difficulty);
      setError(false);
      history("/quiz");
    }
  };
  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quiz Settings</span>

        <div className="settings_select">
          {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}
          <Button 
            style={{ marginBottom: 30 }}
            variant="outlined"
            onClick={doGoogleSignIn}
            // onChange={(e) => setName(e.target.value)}
            >
            {currentUser ? <p>Player: {auth.currentUser.displayName}</p> : 'Sign In with Google'}
            {/* <p>Name: {auth.currentUser.displayName}</p> */}
          </Button>

          <TextField
            style={{ marginBottom: 30 }}
            select
            label="Select Category"
            variant="outlined"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {Categories.map((cat, i) => (
              <MenuItem key={i} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            style={{ marginBottom: 30 }}
            select
            label="Select Difficulty"
            variant="outlined"
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>
      <img src="/quiz.svg" alt="quiz logo" className="banner" />
    </div>
  );
};

export default Home;
