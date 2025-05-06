import { useState } from "react";
import Login from "../shared/Auth/Login";
import Signup from "../shared/Auth/Signup";

const AuthScreen = () => {
  const [activeState, setActiveState] = useState("Login");
  return (
    <div className="w-full fixed top-0 left-0 h-screen z-50 flex items-center justify-center bg-[#00000077]">
        <div className="w-[500px] bg-orange-500 border-orange-900 border-4 rounded-lg shadow-sm p-3">
            {
              activeState === "Login" && <Login setActiveState={setActiveState}/>
            }
            {
              activeState === "Signup" && <Signup setActiveState={setActiveState}/>
            }
        </div>
    </div>
  )
}

export default AuthScreen