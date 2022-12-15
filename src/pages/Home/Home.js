import { Button, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrrorMessage/ErrorMessage";
import Categories from "../../data/Categories";
import "./Home.css";
import { auth } from '../../firebase.js';
import { Link } from 'react-router-dom';

const Home = ({ fetchQuestions, questions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  auth.onAuthStateChanged((user) => {
     setCurrentUser(user);
  }); 

  const history = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty ) {
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
        <span style={{ fontSize: 30 }}> Are you ready to play ?</span>

        <div className="settings_select">
          {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}
            
          <Button>
          <Link 
            style={{ marginBottom: 30 }} 
            to="/signin" >
            {currentUser ? <b>Player: {auth.currentUser.displayName}</b> : <b>Sign In</b> }
            </Link></Button>

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
      <img src="/Howard_Bison_logo.svg" alt="quiz logo" className="banner" />
    </div>
  );
};

export default Home;
