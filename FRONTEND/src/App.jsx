import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import UserContext from "./contexts/userContext";

import "./App.css";

import Home from "./Telas/Home/Home";
import UserLogin from "./Telas/Login/UserLogin";
import ViewPost from "./Telas/Publi/ViewPost/ViewPost";

function App() {
  const [user, setUser] = useState({})
  useEffect(() =>{
    if (localStorage.getItem("userToken") !== null) {
      setUser({
        logged: true,
        token: localStorage.getItem("userToken"),
        info: JSON.parse(localStorage.getItem('userInfo')),
      })      
    }
  }, [])
  return (
    <>
      <UserContext.Provider value={user}>
        {/* <button onClick={() => console.log(user)}>Teste</button> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/login" element={<UserLogin action="login" />} />
          <Route path="/cadastro" element={<UserLogin action="register" />} />
          <Route path="/post/:id" element={<ViewPost />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
