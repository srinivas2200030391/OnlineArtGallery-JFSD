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
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Eye, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import config from "@/config";

const ManageArtists = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    bio: "",
  });

  // Fetch artists from API
  const fetchArtists = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.baseURL}/admin/artists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArtists(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch artists",
        variant: "destructive",
      });
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
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

  // Handle Add New Artist
  const handleAddNewArtist = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${config.baseURL}/admin/artists`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add new artist to local state
      setArtists([...artists, response.data]);

      // Reset form and close modal
      setFormData({
        name: "",
        username: "",
        password: "",
        bio: "",
      });
      setIsAddModalOpen(false);

      toast({
        title: "Success",
        description: "Artist added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add artist",
        variant: "destructive",
      });
      console.error("Error adding artist:", error);
    }
  };

  // Handle Update Artist
  const handleUpdateArtist = async (e) => {
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

      toast({
        title: "Success",
        description: "Artist updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update artist",
        variant: "destructive",
      });
      console.error("Error updating artist:", error);
    }
  };

  // Confirm Delete Artist
  const handleConfirmDeleteArtist = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${config.baseURL}/admin/artists/${selectedArtist.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove artist from local state
      setArtists(artists.filter((artist) => artist.id !== selectedArtist.id));
      setIsDeleteModalOpen(false);

      toast({
        title: "Success",
        description: "Artist deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete artist",
        variant: "destructive",
      });
      console.error("Error deleting artist:", error);
    }
  };

  // Prepare for update
  const prepareUpdateArtist = (artist) => {
    setSelectedArtist(artist);
    setFormData({
      name: artist.name,
      username: artist.username,
      password: "",
      bio: artist.bio,
    });
    setIsUpdateModalOpen(true);
  };

  // View artist details
  const viewArtistDetails = (artist) => {
    setSelectedArtist(artist);
    setIsDetailsModalOpen(true);
  };

  // Prepare for delete
  const prepareDeleteArtist = (artist) => {
    setSelectedArtist(artist);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6 h-full">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Artist Management</CardTitle>
          <Button
            onClick={() => {
              setFormData({
                name: "",
                username: "",
                password: "",
                bio: "",
              });
              setIsAddModalOpen(true);
            }}
          >
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
                  <TableCell>
                    {artist.bio ? artist.bio.substring(0, 50) + "..." : ""}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => viewArtistDetails(artist)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => prepareUpdateArtist(artist)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => prepareDeleteArtist(artist)}
                      >
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

      {/* Add Artist Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Artist</DialogTitle>
            <DialogDescription>
              Create a new artist profile in the system
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddNewArtist} className="space-y-4">
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
                placeholder="Enter password"
                required
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
            <Button type="submit">Create Artist</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Update Artist Modal */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Artist Profile</DialogTitle>
            <DialogDescription>
              Modify the details of an existing artist
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateArtist} className="space-y-4">
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
                placeholder="Leave blank to keep current password"
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

      {/* Artist Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Artist Profile Details</DialogTitle>
          </DialogHeader>
          {selectedArtist && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-bold">Name</Label>
                  <p>{selectedArtist.name}</p>
                </div>
                <div>
                  <Label className="font-bold">Username</Label>
                  <p>{selectedArtist.username}</p>
                </div>
                <div className="col-span-2">
                  <Label className="font-bold">Bio</Label>
                  <p>{selectedArtist.bio}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this artist?
            </DialogDescription>
          </DialogHeader>
          {selectedArtist && (
            <div className="space-y-4">
              <p>
                Artist: <strong>{selectedArtist.name}</strong>
              </p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleConfirmDeleteArtist}>
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageArtists;