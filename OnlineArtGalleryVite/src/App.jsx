import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Signin from "./Components/Signin";
import Signup from "./Components/signup";
import Cards from "./Components/Cards";
import NotFound from "./Components/NotFound";
import ArtistDashboard from './Components/artistDashboard';
import AdminDashboard from './Components/adminDashboard';
import VisitorDashboard from './Components/visitorDashboard';
import CuratorDashboard from './Components/curatorDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/artistDashboard" element={<ArtistDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/visitorDashboard" element={<VisitorDashboard />} />
        <Route path="/curatorDashboard" element={<CuratorDashboard />} />
           <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;