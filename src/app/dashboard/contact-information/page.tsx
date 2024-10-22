"use client";

import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: -3.745, // Default latitude
  lng: -38.523, // Default longitude
};

export default function ContactInformationPage() {
  const [phone, setPhone] = useState("123-456-7890");
  const [email, setEmail] = useState("example@example.com");
  const [location, setLocation] = useState(center);
  const [address, setAddress] = useState("Location");
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });

  const searchBoxRef = useRef<any>(null); // Reference for the search box

  const handleUpdateSocialMedia = (platform: string, value: string) => {
    setSocialMediaLinks({ ...socialMediaLinks, [platform]: value });
  };

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    const place = places[0];
    if (place) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLocation({ lat, lng });
      setAddress(place.formatted_address);
    }
  };

  return (
    <div className="p-4 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 w-full h-full">
      <h1 className="text-2xl font-semibold">Contact Information Management</h1>

      {/* Phone Number */}
      <div className="flex items-center justify-between border-b border-neutral-300 pb-2 mb-4">
        <label className="text-lg">Phone Number:</label>
        <input
          type="text"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="border rounded-md p-1 md:w-1/2"
        />
      </div>

      {/* Email */}
      <div className="flex items-center justify-between border-b border-neutral-300 pb-2 mb-4">
        <label className="text-lg">Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded-md p-1 md:w-1/2"
        />
      </div>

      {/* Location */}
      <div className="flex items-center justify-between border-b border-neutral-300 pb-2 mb-4">
        <label className="text-lg">Location:</label>
        <LoadScript
          googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" // Replace with your actual API key
          libraries={["places"]} // Ensure places library is loaded
        >
          <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={10}>
            <StandaloneSearchBox onPlacesChanged={handlePlacesChanged} ref={searchBoxRef}>
              <input
                type="text"
                placeholder="Search for a location..."
                className="border rounded-md p-2 mb-4"
              />
            </StandaloneSearchBox>
            <Marker position={location} />
          </GoogleMap>
        </LoadScript>
        <span className="text-lg ml-4">{address}</span>
      </div>

      {/* Social Media Links */}
      <div className="border-b border-neutral-300 pb-2 mb-4">
        <label className="text-lg">Social Media Links:</label>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <FaFacebook className="mr-2 text-blue-600" />
            <input
              type="text"
              placeholder="Facebook Link"
              value={socialMediaLinks.facebook}
              onChange={e => handleUpdateSocialMedia("facebook", e.target.value)}
              className="border rounded-md p-1 w-full"
            />
          </div>
          <div className="flex items-center">
            <FaTwitter className="mr-2 text-blue-400" />
            <input
              type="text"
              placeholder="Twitter Link"
              value={socialMediaLinks.twitter}
              onChange={e => handleUpdateSocialMedia("twitter", e.target.value)}
              className="border rounded-md p-1 w-full"
            />
          </div>
          <div className="flex items-center">
            <FaInstagram className="mr-2 text-pink-500" />
            <input
              type="text"
              placeholder="Instagram Link"
              value={socialMediaLinks.instagram}
              onChange={e => handleUpdateSocialMedia("instagram", e.target.value)}
              className="border rounded-md p-1 w-full"
            />
          </div>
          <div className="flex items-center">
            <FaLinkedin className="mr-2 text-blue-700" />
            <input
              type="text"
              placeholder="LinkedIn Link"
              value={socialMediaLinks.linkedin}
              onChange={e => handleUpdateSocialMedia("linkedin", e.target.value)}
              className="border rounded-md p-1 w-full"
            />
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <button className="bg-green-500 text-white rounded-md p-2 mt-4">
        Save Changes
      </button>
    </div>
  );
}
