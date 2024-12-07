import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">About Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-base leading-7">
            Welcome to our platform! We are dedicated to fostering creativity,
            collaboration, and innovation in the art community. Our mission is
            to provide a comprehensive and engaging experience for artists,
            curators, and visitors alike.
          </p>

          <h3 className="text-xl font-semibold mt-6">Our Mission</h3>
          <p className="text-gray-700 text-base leading-7 mt-2">
            Our mission is to connect artists with curators and provide a
            platform where art can thrive. We aim to create a space where
            everyone can explore, appreciate, and support creativity in all its
            forms.
          </p>

          <h3 className="text-xl font-semibold mt-6">What We Offer</h3>
          <ul className="list-disc list-inside mt-2 text-gray-700 text-base">
            <li>A platform to showcase stunning artwork.</li>
            <li>
              Opportunities for artists to connect with curators and
              exhibitions.
            </li>
            <li>
              Tools for curators to plan and manage exhibitions seamlessly.
            </li>
            <li>
              A visitor-friendly experience to explore and engage with art.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Contact Us</h3>
          <p className="text-gray-700 text-base leading-7 mt-2">
            We’d love to hear from you! Whether you’re an artist, curator, or
            visitor, feel free to reach out to us at{" "}
            <a
              href="mailto:contact@yourdomain.com"
              className="text-blue-500 underline">
              contact@yourdomain.com
            </a>{" "}
            for any questions or suggestions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
