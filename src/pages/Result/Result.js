import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css";

const Result = ({ score }) => {
  const history = useNavigate();

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
