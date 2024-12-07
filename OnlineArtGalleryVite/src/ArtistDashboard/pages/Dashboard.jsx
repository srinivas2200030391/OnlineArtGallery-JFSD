import React, { useState, useEffect } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  Users, 
  Image, 
  PaletteIcon, 
  LayoutGrid 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import config from './../../config';

const Dashboard = () => {
  const [stats, setStats] = useState({
    numberOfVisitors: 5,
    numberOfArtworks: 10,
    numberOfArtists: 15,
    numberOfCurators: 12
  });

  // Mock historical data for charts (in a real app, fetch from backend)
  const [visitorTrend, setVisitorTrend] = useState([
    { month: "Jan", visitors: 400 },
    { month: "Feb", visitors: 300 },
    { month: "Mar", visitors: 200 },
    { month: "Apr", visitors: 278 },
    { month: "May", visitors: 189 },
    { month: "Jun", visitors: 239 }
  ]);

  const [artworkTrend, setArtworkTrend] = useState([
    { month: "Jan", artworks: 50 },
    { month: "Feb", artworks: 75 },
    { month: "Mar", artworks: 60 },
    { month: "Apr", artworks: 90 },
    { month: "May", artworks: 70 },
    { month: "Jun", artworks: 100 }
  ]);
 useEffect(() => {
   const fetchStats = async () => {
     try {
       // Retrieve token from local storage
       const token = localStorage.getItem("token");
       // Make the request with the token in the Authorization header
       const response = await fetch(`${config.baseURL}/admin/stats`, {
         method: "GET",
         credentials:"include",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`, // Add the token
         },
       });

       // Check if the response is successful
       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }

       const data = await response.json();
       setStats(data);
     } catch (error) {
       console.error("Error fetching stats:", error);
     }
   };

   fetchStats();
 }, []);

  // Stat card component
  const StatCard = ({ icon: Icon, title, value, color }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          icon={Users} 
          title="Total Visitors" 
          value={stats.numberOfVisitors} 
          color="text-blue-500" 
        />
        <StatCard 
          icon={Image} 
          title="Total Artworks" 
          value={stats.numberOfArtworks} 
          color="text-green-500" 
        />
        <StatCard 
          icon={PaletteIcon} 
          title="Total Artists" 
          value={stats.numberOfArtists} 
          color="text-purple-500" 
        />
        <StatCard 
          icon={LayoutGrid} 
          title="Total Curators" 
          value={stats.numberOfCurators} 
          color="text-orange-500" 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Visitor Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitorTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#8884d8" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Artwork Upload Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={artworkTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="artworks" 
                  stroke="#82ca9d" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;