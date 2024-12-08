import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Heart, ShoppingCart, Star, Eye, Calendar, Tags } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import config from "./../../config";

const VisitorDashboard = () => {
  const [visitorStats, setVisitorStats] = useState({
    artworksFavorited: 12,
    artworksPurchased: 5,
    exhibitionsVisited: 3,
    totalArtworkViews: 248,
  });

  // Mock data for artwork interaction trends
  const [artworkInteractionTrend, setArtworkInteractionTrend] = useState([
    { month: "Jan", views: 120 },
    { month: "Feb", views: 180 },
    { month: "Mar", views: 220 },
    { month: "Apr", views: 250 },
    { month: "May", views: 300 },
    { month: "Jun", views: 280 },
  ]);

  // Mock data for purchase trends
  const [purchaseTrend, setPurchaseTrend] = useState([
    { month: "Jan", purchases: 2 },
    { month: "Feb", purchases: 3 },
    { month: "Mar", purchases: 4 },
    { month: "Apr", purchases: 5 },
    { month: "May", purchases: 6 },
    { month: "Jun", purchases: 4 },
  ]);

  useEffect(() => {
    const fetchVisitorStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${config.baseURL}/visitor/dashboard`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setVisitorStats(data);
      } catch (error) {
        console.error("Error fetching visitor stats:", error);
      }
    };

    fetchVisitorStats();
  }, []);

  // Visitor Stat Card Component
  const VisitorStatCard = ({ icon: Icon, title, value, color }) => (
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
        <VisitorStatCard
          icon={Heart}
          title="Artworks Favorited"
          value={visitorStats.artworksFavorited}
          color="text-pink-500"
        />
        <VisitorStatCard
          icon={ShoppingCart}
          title="Artworks Purchased"
          value={visitorStats.artworksPurchased}
          color="text-green-500"
        />
        <VisitorStatCard
          icon={Calendar}
          title="Exhibitions Visited"
          value={visitorStats.exhibitionsVisited}
          color="text-purple-500"
        />
        <VisitorStatCard
          icon={Eye}
          title="Total Artwork Views"
          value={visitorStats.totalArtworkViews}
          color="text-blue-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Artwork Interaction Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={artworkInteractionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Purchase Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={purchaseTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="purchases"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Favorites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Cosmic Dreams</span>
                <Star className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Urban Rhythm</span>
                <Star className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Moonlit Serenity</span>
                <Star className="h-4 w-4 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exhibitions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Modern Art Showcase</span>
                <Calendar className="h-4 w-4 text-purple-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Emerging Artists Expo</span>
                <Calendar className="h-4 w-4 text-purple-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Digital Art Revolution</span>
                <Calendar className="h-4 w-4 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Genres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Abstract</span>
                <Tags className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Landscape</span>
                <Tags className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Digital Art</span>
                <Tags className="h-4 w-4 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisitorDashboard;
