import ArtistDashboard from "./ArtistDashboard/App"; 
import CuratorDashboard from "./CuratorDashboard/App"; 
import VisitorDashboard from "./VisitorDashboard/App"; 
import Home from "./Home/index"; 
import { useEffect, useState } from "react"; 
import Admin from './AdminDashboard/App';
 
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
 
 
  return ( 
    <div className="w-full h-screen"> 
      {(() => { 
        if (isAdminLoggedIn) { 
          return <Admin/>; 
        } else if (isArtistLoggedIn) { 
          return <ArtistDashboard  />; 
        } else if (isCuratorLoggedIn) { 
          return <CuratorDashboard  />; 
        } else if (isVisitorLoggedIn) { 
          return <VisitorDashboard  />; 
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
