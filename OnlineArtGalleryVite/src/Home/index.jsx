import { Route, Routes } from "react-router-dom";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ArtistDashboard from "../components/ArtistDashboard";
import AdminDashboard from "../components/AdminDashboard";
import VisitorDashboard from "../components/VisitorDashboard";
import CuratorDashboard from "../components/CuratorDashboard";
import Home from "./Home";
import Sidebar from "../SimilarComponents/SideNavBar";
import TopNavbar from "../SimilarComponents/TopNavBar";
import Curatorapp from "../CuratorDashboard/App";

export default function index({
  onAdminLogin,
  onArtistLogin,
  onCuratorLogin,
  onVisitorLogin,
}) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={
            <SignIn
              onAdminLogin={onAdminLogin}
              onArtistLogin={onArtistLogin}
              onCuratorLogin={onCuratorLogin}
              onVisitorLogin={onVisitorLogin}
            />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/artistDashboard" element={<ArtistDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard/>} />
        <Route path="/visitorDashboard" element={<VisitorDashboard />} />
        <Route path="/curatorDashboard" element={<Curatorapp />} />
        <Route path="/sidenav" element={<Sidebar />} />
        <Route path="/topnav" element={<TopNavbar/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}
