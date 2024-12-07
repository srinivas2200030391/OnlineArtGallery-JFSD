import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Eye, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import config from './../../config';

const ManageArtists = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    bio: "",
  });


  // Fetch artists from API
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await axios.get(`${config.baseURL}/admin/artists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArtists(response.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  // Handle input changes in forms
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateArtist = (artist) => {
    setSelectedArtist(artist);
    setFormData({
      name: artist.name,
      username: artist.username,
      password: "", // Don't pre-fill password
      bio: artist.bio,
    });
    setIsUpdateModalOpen(true);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${config.baseURL}/admin/artists/${selectedArtist.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setArtists(
        artists.map((artist) =>
          artist.id === selectedArtist.id ? { ...artist, ...formData } : artist
        )
      );
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating artist:", error);
    }
  };

  const handleDeleteArtist = async (artistId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${config.baseURL}/admin/artists/${artistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setArtists(artists.filter((artist) => artist.id !== artistId));
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  };

  const handleViewDetails = (artist) => {
    setSelectedArtist(artist);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6 h-full">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Artist Management</CardTitle>
          <Button variant="outline">
            <UserPlus className="mr-2 h-4 w-4" /> Add New Artist
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 h-[calc(100vh-200px)] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {artists.map((artist) => (
                <TableRow key={artist.id}>
                  <TableCell>{artist.name}</TableCell>
                  <TableCell>{artist.username}</TableCell>
                  <TableCell>{artist.bio?.substring(0, 50)}...</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleViewDetails(artist)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleUpdateArtist(artist)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDeleteArtist(artist.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Update Artist Dialog */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Update Artist Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitUpdate} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </div>
            <div>
              <Label>Username</Label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter new password (leave blank to keep current)"
              />
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Enter artist bio"
                rows={4}
              />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Artist Details Dialog */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Artist Profile Details</DialogTitle>
          </DialogHeader>
          {selectedArtist && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <p>{selectedArtist.name}</p>
                </div>
                <div>
                  <Label>Username</Label>
                  <p>{selectedArtist.username}</p>
                </div>
                <div className="col-span-2">
                  <Label>Bio</Label>
                  <p>{selectedArtist.bio}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageArtists;
