import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ArtworkGallery from "./pages/ArtworkGallery";
import ContactForm from "./pages/ContactForm";
import VisitorFAQ from "./pages/VisitorFAQ ";
import VisitorFeedbackForm from "./pages/VisitorFeedbackForm";
import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <Routes>
      {/* All routes under /admin */}
      <Route element={<Layout />}>
        <Route path="/*" index element={<Dashboard />} />
        <Route path="/explore" element={<ArtworkGallery />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/FAQ" element={<VisitorFAQ />} />
        <Route path="/Feedback" element={<VisitorFeedbackForm />} />
        <Route path="/About" element={<AboutPage/>} />
      </Route>
    </Routes>
  );
};

export default App;
