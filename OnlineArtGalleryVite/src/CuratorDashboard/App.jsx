import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ArtworkGallery from "./pages/ArtworkGallery";
import AddArtwork from "./pages/AddArtwork";

const App = () => {
  return (
    <Routes>
      {/* All routes under /admin */}
      <Route element={<Layout />}>
        <Route path="/*" index element={<Dashboard />} />
        <Route path="/collections" element={<ArtworkGallery />} />
        <Route path="curate" element={<AddArtwork />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
