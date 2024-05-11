import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Problem from "./Components/Problem";
import "./App.css";
import Problemset from "./Components/Problemset";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Protected from "./Components/Protected";
import IDE from "./Components/Ide";
import Submissions from "./Components/Submissions";

function App() {
  // const [isLoggedIn, setisLoggedIn] = useState(false);
  // const logIn = () => {
  //   setisLoggedIn(true);
  // };
  // const logOut = () => {
  //   setisLoggedIn(false);
  // };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/problemset"
            element={
              <Protected>
                <Problemset />
              </Protected>
            }
          />
          <Route
            path="/problem/:id"
            element={
              <Protected>
                <Problem />
              </Protected>
            }
          />
          <Route
            path="/ide"
            element={
              <Protected>
                <IDE />
              </Protected>
            }
          />
          <Route
            path="/submissions"
            element={
              <Protected>
                <Submissions />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
