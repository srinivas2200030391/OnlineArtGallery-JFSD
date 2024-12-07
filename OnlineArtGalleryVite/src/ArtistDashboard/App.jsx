 import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import ManageArtists from "./pages/ManageArtists"
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Routes>
      {/* All routes under /admin */}
      <Route  element={<Layout />}>
        <Route path="/*" index element={<Dashboard />} />
        <Route path="/manage-users" element = {<ManageArtists/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
