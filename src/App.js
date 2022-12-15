import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";
import Result from "./pages/Result/Result";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp.js";


function App() {
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10&${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestions(data.results);
  };

  return (
    <Router>
      <div className="App" style={{ backgroundImage: "url(./HU-DYK.png)" }}>
        <Header />

        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                fetchQuestions={fetchQuestions}
                questions={questions}
              />
            }
          ></Route>
          <Route
            path="/quiz"
            element={
              <Quiz
                questions={questions}
                setQuestions={setQuestions}
                score={score}
                setScore={setScore}
              />
            }
          ></Route>
          <Route
            path="/result"
            element={<Result score={score} />}
          ></Route>
          <Route
            path="/signin"
            element={<SignIn  />}
          ></Route>
          <Route
            path="/signup"
            element={<SignUp  />}
          ></Route>
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", color: "red" }}>
                <h1>404 Error Not Found</h1>
                <h2>Invalid Page</h2>
              </div>
            }
          ></Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
