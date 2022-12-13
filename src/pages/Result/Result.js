import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css";
import { auth } from '../../firebase.js';

const Result = ({ score }) => {
  const history = useNavigate();
  const name = auth.currentUser.displayName;

  // useEffect(() => {
  //   if (!name) {
  //     history("/");
  //   }
  // }, [name, history]);
  return (
    <div className="result">
      <span className="title">Final Score : {score}</span>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        onClick={(e) => {
          e.preventDefault();
          history("/");
        }}
      >
        Go To Homepage
      </Button>
    </div>
  );
};

export default Result;
