import React from 'react'


import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import { UserData } from "./context/UserContext";

const App = () => {
  const { isAuth, loading } = UserData();

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/account" element={isAuth ? <Account /> : <Login />} />
        <Route path="/login" element={<Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;



