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
import { Grid, Image, Users, Star, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import config from "./../../config";

const CuratorDashboard = () => {
  const [curatorStats, setCuratorStats] = useState({
    pendingArtworks: 5,
    approvedArtworks: 42,
    rejectedArtworks: 3,
    assignedExhibitions: 2,
  });

  // Mock data for artwork submission trends
  const [artworkSubmissionTrend, setArtworkSubmissionTrend] = useState([
    { month: "Jan", submissions: 20 },
    { month: "Feb", submissions: 35 },
    { month: "Mar", submissions: 25 },
    { month: "Apr", submissions: 45 },
    { month: "May", submissions: 38 },
    { month: "Jun", submissions: 55 },
  ]);

  // Mock data for exhibition planning
  const [exhibitionPlanningTrend, setExhibitionPlanningTrend] = useState([
    { month: "Jan", exhibitions: 1 },
    { month: "Feb", exhibitions: 1 },
    { month: "Mar", exhibitions: 2 },
    { month: "Apr", exhibitions: 2 },
    { month: "May", exhibitions: 3 },
    { month: "Jun", exhibitions: 2 },
  ]);

  useEffect(() => {
    const fetchCuratorStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${config.baseURL}/curator/dashboard`, {
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
        setCuratorStats(data);
      } catch (error) {
        console.error("Error fetching curator stats:", error);
      }
    };

    fetchCuratorStats();
  }, []);

  // Curator Stat Card Component
  const CuratorStatCard = ({ icon: Icon, title, value, color }) => (
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
        <CuratorStatCard
          icon={Clock}
          title="Pending Artworks"
          value={curatorStats.pendingArtworks}
          color="text-yellow-500"
        />
        <CuratorStatCard
          icon={CheckCircle}
          title="Approved Artworks"
          value={curatorStats.approvedArtworks}
          color="text-green-500"
        />
        <CuratorStatCard
          icon={Image}
          title="Rejected Artworks"
          value={curatorStats.rejectedArtworks}
          color="text-red-500"
        />
        <CuratorStatCard
          icon={Grid}
          title="Assigned Exhibitions"
          value={curatorStats.assignedExhibitions}
          color="text-purple-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Artwork Submission Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={artworkSubmissionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="submissions"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exhibition Planning Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={exhibitionPlanningTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="exhibitions"
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

export default CuratorDashboard;
