import React from 'react';
import useAuth from './useAuth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import TopArtists from './Components/TopArtists';
import TopTracks from './Components/TopTracks';
import GetAudioFeatures from './Components/GetAudioFeatures';
import GetRecommendations from './Components/GetRecommendations';
import GetRecentlyPlayed from './Components/GetRecentlyPlayed';
import "./assets/dashboard.css"

export default function Dashboard(code) {
  const accessToken = useAuth(code);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TopTracks token={accessToken} />} />
        <Route path="/artists" element={<TopArtists token={accessToken} />} />
        <Route path="/RecentlyPlayed" element={<GetRecentlyPlayed token={accessToken} />} />
        <Route path="/Recommendations" element={<GetRecommendations token={accessToken} />} />
        <Route path="/viewstats" element={<GetAudioFeatures />} />
      </Routes>
    </BrowserRouter>
  );
}
