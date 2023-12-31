import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import ConfirmEmail from "./components/ConfirmEmail";
import Contact from "./components/Contact";
import Redirect from "./components/Redirect";
import ResetPassword from "./components/ResetPassword";
import PasswordRecovery from "./components/PasswordRecovery";
import ChangePassword from "./components/ChangePassword";
import UserContext from "./components/UserContext";
import { useLocation } from 'react-router-dom'
import Landing from "./components/Landing";
import axios from "axios";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";


function App() {
const location = useLocation()

  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("")
  const [click, setClick] = useState(false);

  let token;

  if (JSON.parse(localStorage.getItem("my-profile"))) {
    token = JSON.parse(localStorage.getItem("my-profile")).res.tokenId; // Google token
  } else {
    token = JSON.parse(localStorage.getItem("my-app-token")); // Our token
  }

  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

     useEffect(() => {
    if (token !== null) {
      axios
        .get(`${process.env.REACT_APP_BE_URL}/api/user/authorize-user`, configuration)
        .then((res) => {
          setName(res.data.name);
          setAuthenticated(true);
          setUserId(res.data.userId);
          res.data.avatar? setAvatar(res.data.avatar) : setAvatar("https://cdn-icons-png.flaticon.com/512/6388/6388000.png") 
        })
        .catch((err) => {
          if(err.response.status === 401)
          localStorage.removeItem("my-app-token");
          localStorage.removeItem("my-profile");
          console.log(err.message)
        });
    }
  }, []);   
  

const logoutHandler = () => {
  setAuthenticated(false);
    localStorage.removeItem("my-profile");
    localStorage.removeItem("my-app-token"); 
    setName("");
    setAvatar("")
    setClick(false)
};

  return (
    <UserContext.Provider
      value={[
        { authenticated: authenticated, setAuthenticated: setAuthenticated },
        { name: name, setName: setName },
        { userId: userId, setUserId: setUserId },
        { email: email, setEmail: setEmail },
        {avatar: avatar, setAvatar: setAvatar},
        {logoutHandler: logoutHandler},
        {click: click, setClick: setClick}
      ]}
    >
      {location.pathname !== "/" && <  NavBar />}
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-email/:token" element={<ConfirmEmail />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route
            path="/reset-password/:email/:tokWe bring a digital assistant to issue prepaid cards & gift cards directly to you. Wherever you are, whenever you need them, looking for subscriptions, games, shopping vouchers, choose from a wide variety of vendors and buy your eGift cards online with fast email delivery!
            en"
            element={<PasswordRecovery />}
          />
        </Routes>
        {/* {location.pathname !== "/" && <  Footer />} */}

      </div>
          <div><Footer/></div>
      
    </UserContext.Provider>
  );
}

export default App;
