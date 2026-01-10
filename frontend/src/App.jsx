import React from 'react'


import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import { UserData } from "./context/UserContext";
import Navigationbar from './Components/Navigationbar';
import NotFound from './Components/NotFound';

const App = () => {
  const { user, isAuth, loading } = UserData();

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />} />
        <Route path="/login" element={<Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path ='*' element={<NotFound/>}/>
      </Routes>
      {isAuth?<Navigationbar/>:"Login first"}
    </BrowserRouter>
  );
};

export default App;



