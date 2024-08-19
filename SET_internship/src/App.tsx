import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from "react";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import Dashboard from './components/dashboard/Dashboard'

function App() {


  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/sign_up" />} />
                <Route path="/sign_up" element={<SignUp />} />
                <Route path="/sign_in" element={<SignIn />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>

    </>
  )
}

export default App
