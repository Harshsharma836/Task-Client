import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Login from "./components/Login";
import Profile from "./components/Profile";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const [taskTitle, setTaskTitle] = useState("Tasks");

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://3.110.222.30:4000/api/user/me",
          {  headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, }
        );
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (error) {
        console.log("USER IS NOT AUTHENTICATED!");
        setIsAuthenticated(false);
        setUser({});
      }
    };
    handleGetUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar
          setTasks={setTasks}
          setIsAuthenticated={setIsAuthenticated}
          isAuthenticated={isAuthenticated}
          setTaskTitle={setTaskTitle}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isAuthenticated={isAuthenticated}
                tasks={tasks}
                setTasks={setTasks}
                taskTitle={taskTitle}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route
            path="/profile"
            element={<Profile user={user} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
