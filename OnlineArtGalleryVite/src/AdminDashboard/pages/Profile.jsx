import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import axios from "axios";

const ProfileSection = ({ config }) => {
  // State for storing user details
  const [username, setUsername] = useState("Guest");
  const [editableUsername, setEditableUsername] = useState(username);

  // Ref for GSAP animation
  const profileRef = useRef();

  useEffect(() => {
    // GSAP animation on mount
    gsap.fromTo(
      profileRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Fetch user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.username);
      setEditableUsername(parsedUser.username);
    }
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.post(`${config.baseURL}/admin/update`, {
        username: editableUsername,
      });

      if (response.status === 200) {
        setUsername(editableUsername);

        // GSAP animation on successful update
        gsap.to(profileRef.current, {
          scale: 1.05,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        });
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <div
      ref={profileRef}
      className="profile-section mx-auto p-8 bg-white border border-gray-200 rounded-lg shadow-md max-w-4xl"
      style={{ backgroundColor: "white" }}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Your Profile
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            className="w-full p-3 rounded-md border border-gray-300 bg-blue-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={editableUsername}
            onChange={(e) => setEditableUsername(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={handleUpdate}
        className="mt-6 w-full py-3 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300">
        Update Profile
      </button>
    </div>
  );
};

export default ProfileSection;
