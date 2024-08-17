import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Connect from "./api/connect";
import BASE_URL from "./api/endpoints";
import React from "react";
import PhoneNumberCheck from './components/login/PhoneNumberCheck.js';
import Signup from './components/signup/SignUp';

function App() {


  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/sign_up" />} />
                <Route path="/sign_up" element={<Signup />} />

            </Routes>
        </Router>

    </>
  )
}

export default App
