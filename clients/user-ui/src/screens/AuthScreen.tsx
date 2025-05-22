'use client'
import { useState } from "react";
import Login from "../shared/Auth/Login";
import Signup from "../shared/Auth/Signup";
import Verification from "../shared/Auth/Verification";
import ForgotPassword from "../shared/Auth/ForgotPassword";

const AuthScreen = () => {
  const [activeState, setActiveState] = useState("Login");
  
  return (
        <div className="w-[500px] bg-white rounded-lg shadow-lg p-3">
            {
              activeState === "Login" && <Login setActiveState={setActiveState}/>
            }
            {
              activeState === "Signup" && <Signup setActiveState={setActiveState}/>
            }
            {
              activeState === "Verification" && <Verification setActiveState={setActiveState}/>
            }
            {
              activeState == "ForgotPassword" && <ForgotPassword setActiveState={setActiveState}/>
            }
        </div>
  )
}

export default AuthScreen