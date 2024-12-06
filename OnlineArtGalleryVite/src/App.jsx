import AdminDashboard from "./components/AdminDashboard"; 
import ArtistDashboard from "./components/ArtistDashboard"; 
import CuratorDashboard from "./components/CuratorDashboard"; 
import VisitorDashboard from "./components/VisitorDashboard"; 
import Home from "./Home/index"; 
import { useEffect, useState } from "react"; 
 
function App() { 
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); 
  const [isArtistLoggedIn, setIsArtistLoggedIn] = useState(false); 
  const [isCuratorLoggedIn, setIsCuratorLoggedIn] = useState(false); 
  const [isVisitorLoggedIn, setIsVisitorLoggedIn] = useState(false); 
 
  useEffect(() => { 
    // Retrieve login states from localStorage 
    const adminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true"; 
    const artistLoggedIn = localStorage.getItem("isArtistLoggedIn") === "true"; 
    const curatorLoggedIn = localStorage.getItem("isCuratorLoggedIn") === "true"; 
    const visitorLoggedIn = localStorage.getItem("isVisitorLoggedIn") === "true"; 
 
    setIsAdminLoggedIn(adminLoggedIn); 
    setIsArtistLoggedIn(artistLoggedIn); 
    setIsCuratorLoggedIn(curatorLoggedIn); 
    setIsVisitorLoggedIn(visitorLoggedIn); 
  }, []); 
 
  const onAdminLogin = () => { 
    localStorage.setItem("isAdminLoggedIn", "true"); 
    setIsAdminLoggedIn(true); 
  }; 
 
  const onArtistLogin = () => { 
    localStorage.setItem("isArtistLoggedIn", "true"); 
    setIsArtistLoggedIn(true); 
  }; 
 
  const onCuratorLogin = () => { 
    localStorage.setItem("isCuratorLoggedIn", "true"); 
    setIsCuratorLoggedIn(true); 
  }; 
 
  const onVisitorLogin = () => { 
    localStorage.setItem("isVisitorLoggedIn", "true"); 
    setIsVisitorLoggedIn(true); 
  }; 
 
  const handleLogout = () => { 
    // Clear all login states and localStorage 
    localStorage.clear(); 
    setIsAdminLoggedIn(false); 
    setIsArtistLoggedIn(false); 
    setIsCuratorLoggedIn(false); 
    setIsVisitorLoggedIn(false); 
  }; 
 
  return ( 
    <div className="w-full h-screen"> 
      {(() => { 
        if (isAdminLoggedIn) { 
          return <AdminDashboard onLogout={handleLogout} />; 
        } else if (isArtistLoggedIn) { 
          return <ArtistDashboard onLogout={handleLogout} />; 
        } else if (isCuratorLoggedIn) { 
          return <CuratorDashboard onLogout={handleLogout} />; 
        } else if (isVisitorLoggedIn) { 
          return <VisitorDashboard onLogout={handleLogout} />; 
        } else { 
          return ( 
            <Home 
              onAdminLogin={onAdminLogin} 
              onArtistLogin={onArtistLogin} 
              onCuratorLogin={onCuratorLogin} 
              onVisitorLogin={onVisitorLogin} 
            /> 
          ); 
        } 
      })()} 
    </div> 
  ); 
} 
 
export default App;
