import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import config from "../../config";

const AddArtwork = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    artist: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${config.baseURL}/curators/arts`,
        {
          ...formData,
          price: parseFloat(formData.price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        artist: "",
        price: "",
      });

      // Optionally, show success message or redirect
      alert("Artwork added successfully!");
    } catch (error) {
      console.error("Error adding artwork:", error);
      alert("Failed to add artwork. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PlusCircle className="mr-2 h-6 w-6" /> Add New Artwork
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter artwork title"
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter artwork description"
                rows={4}
                required
              />
            </div>
            <div>
              <Label>Artist</Label>
              <Input
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
                placeholder="Enter artist name"
                required
              />
            </div>
            <div>
              <Label>Price</Label>
              <Input
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter artwork price"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Add Artwork
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddArtwork;
