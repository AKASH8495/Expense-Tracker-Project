import React, { useState } from "react";
import { auth } from "../Firebase/FireBase";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const currentUser = auth.currentUser;

  const handleUpdate = async () => {
    try {
      setIsSubmitting(true);
      const idToken = await auth.currentUser.getIdToken();
      const APIKEY = "AIzaSyBBEmPQ77oXLgPI2yoT5uiPcIBsxayKK_M";

      const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${APIKEY}`;

      const requestBody = {
        idToken: idToken,
        displayName: fullName,
        photoUrl: photoUrl,
        returnSecureToken: true,
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log("response", response);

      if (currentUser) {
        console.log("No user is currently signed in");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

      // Successfully updated user profile
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-500 to-purple-600">
      <div className="bg-slate-400 w-[50%] mx-auto  p-8 rounded-md">
        <h2 className="text-center mb-6 text-2xl font-semibold">
          Update Details
        </h2>
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <label htmlFor="fullName" className="w-32">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              placeholder="Enter your full name"
              onChange={(e) => setFullName(e.target.value)}
              className="flex-1 border border-gray-400 rounded-md p-2 "
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="photoUrl" className="w-32">
              Profile Photo URL
            </label>
            <input
              type="text"
              id="photoUrl"
              placeholder="Paste profile photo url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="flex-1 border border-gray-400 rounded-md p-2"
            />
          </div>
        </div>

        <div className="flex justify-center mt-10 space-x-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleUpdate}
            disabled={isSubmitting}
          >
            Update Profile
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
