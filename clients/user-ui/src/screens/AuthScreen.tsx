import { useState } from "react";
import Login from "../shared/Auth/Login";
import Signup from "../shared/Auth/Signup";
import Verification from "../shared/Auth/Verification";
import ForgotPassword from "../shared/Auth/ForgotPassword";

const AuthScreen = ({ setOpen } : {setOpen: (e: boolean) => void}) => {
  const [activeState, setActiveState] = useState("Login");

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === "screen") {
      setOpen(false);
    }
  }
  return (
    <div className="w-full fixed top-0 left-0 h-screen z-50 flex items-center justify-center bg-[#00000077]" id="screen" onClick={handleClose}>
        <div className="w-[500px] bg-orange-500 border-orange-900 border-4 rounded-lg shadow-sm p-3">
            {
              activeState === "Login" && <Login setActiveState={setActiveState} setOpen={setOpen}/>
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
    </div>
  )
}

export default AuthScreen