import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Grid, PlusCircle, DollarSign, Heart } from "lucide-react";

const artworkData = [
  {
    id: 1,
    title: "Moonlit Serenity",
    description:
      "A tranquil landscape capturing the ethereal beauty of a moonlit night, with soft blues and silvery whites blending to create a sense of calm and mystery.",
    artist: "Elena Rodriguez",
    price: 1250.0,
    imageUrl:
      "https://pics.craiyon.com/2023-07-23/2ae1a95ae4a140a88f2e9ab9c5a9e9ca.webp",
  },
  {
    id: 2,
    title: "Urban Rhythm",
    description:
      "A vibrant abstract representation of city life, featuring bold geometric shapes and a dynamic color palette that captures the energy of metropolitan landscapes.",
    artist: "Marcus Chen",
    price: 1850.0,
    imageUrl:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/1b3fb2ed-cf5e-40f2-890d-3f93ce60b422/24b2c7f2-1609-4d42-b34a-c1b1ecae77b7.png",
  },
  {
    id: 3,
    title: "Whispers of Nature",
    description:
      "A delicate watercolor painting exploring the intricate details of wildflowers and their natural habitat, blending soft hues and gentle brushstrokes.",
    artist: "Sophie Laurent",
    price: 950.0,
    imageUrl:
      "https://emilysnotebook.co.uk/wp-content/uploads/2023/07/IMG-1185-1200x900.jpg",
  },
  {
    id: 4,
    title: "Cosmic Dreams",
    description:
      "An abstract exploration of space and imagination, featuring swirling galaxies, vibrant nebulae, and mysterious cosmic landscapes.",
    artist: "Alex Novak",
    price: 2100.0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG_ng0tu7CwMzIyscbXSVLQlkyLN6zBGKT0Q&s",
  },
  {
    id: 5,
    title: "Rustic Memories",
    description:
      "A nostalgic portrayal of countryside life, capturing the warmth and simplicity of rural landscapes with rich, earthy tones.",
    artist: "Isabella Morales",
    price: 1500.0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_RHSBsxLIH-wIvdTuM0AyjwZdjMRDtF5Sdg&s",
  },
  {
    id: 6,
    title: "Urban Reflections",
    description:
      "A photorealistic painting of city streets during rainfall, capturing the mesmerizing play of light and reflection on wet surfaces.",
    artist: "Daniel Kim",
    price: 1750.0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpPWT1ysfIfNdLExVt4Koos-pcynWbNfnQTQ&s",
  },
];

const ArtworkGallery = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (artworkId) => {
    setFavorites((prev) =>
      prev.includes(artworkId)
        ? prev.filter((id) => id !== artworkId)
        : [...prev, artworkId]
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Grid className="mr-2 h-6 w-6" /> Artwork Gallery
        </h1>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Artwork
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworkData.map((artwork) => (
          <Card
            key={artwork.id}
            className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => toggleFavorite(artwork.id)}>
                <Heart
                  className={`h-6 w-6 ${
                    favorites.includes(artwork.id)
                      ? "text-red-500 fill-current"
                      : "text-white"
                  }`}
                />
              </Button>
            </div>
            <CardHeader>
              <CardTitle>{artwork.title}</CardTitle>
              <CardDescription>{artwork.artist}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                {artwork.description.length > 100
                  ? `${artwork.description.substring(0, 100)}...`
                  : artwork.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center text-green-600">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="font-bold">{artwork.price.toFixed(2)}</span>
              </div>
              <div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArtworkGallery;
