import "./App.css";
import ForgotPassword from "./Components/ForgotPassword";
import UpdateProfile from "./Components/UpdateProfile";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Singup from "./Pages/Singup";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return <div >
    <Router>
      <Routes>
      <Route path="/" element={<Singup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/updateprofile" element={<UpdateProfile/>}/>
      <Route path="forgotpassword" element={<ForgotPassword/>}/>
      </Routes>
      
    </Router>
   
  </div>;
}

export default App;
