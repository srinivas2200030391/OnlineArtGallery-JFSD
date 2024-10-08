import React from "react";
import NavBar from "./NavBar";
import Body from "./Body";
import Quote from "./Quote";
import Services from "./Services";
import About from "./about";
import { Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import Contactus from "./Contactus";
import Rights from "./rights";
import Signup from "./signup";
import Cards from "./Cards";
import NotFound from "./NotFound";

// import UserDashboard from "../UserDashboard";
// import Profile from "../scenes/profile";

const Home = () => {
  return (
    <div>
                 <NavBar />
              <Body />
              <Quote />
              <Services />
              <About />
              <Contactus />
              <Rights />
    </div>
  );
};

export default Home;
