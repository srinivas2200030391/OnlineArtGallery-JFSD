 import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import VisitorFeedbackList from "./pages/VisitorFeedbackList";

const App = () => {
  return (
    <Routes>
      {/* All routes under /admin */}
      <Route element={<Layout />}>
        <Route path="/*" index element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Feedback" element={<VisitorFeedbackList/>} />
      </Route>
    </Routes>
  );
};

export default App;
