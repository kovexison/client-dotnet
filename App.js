import logo from './logo.svg';
import {
  BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import './App.css';

import Login from "./components/Login";
import Register from "./components/Register";
import MainPage from "./components/MainPage";
import React, {useState} from "react";
import ListSports from "./components/ListSports";
import DeleteAccount from "./components/DeleteAccount";
import UserStatsMenu from "./components/UserStatsMenu";

  function App() {



    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path={"/"} element={<MainPage />}/>
            <Route path={"/register"} element={<Register />}/>
            <Route path={"/select-workout"} element={<ListSports />} />
            <Route path={"/delete-account"} element={<DeleteAccount />} />
            <Route path={"/user-stats"} element={<UserStatsMenu />} />
          </Routes>
        </Router>
      </div>  
    );
  }

export default App;
