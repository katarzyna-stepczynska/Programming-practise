import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  // const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <GoogleOAuthProvider
      // clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}
      clientId={`725090806564-mq7nq9iv7vlqrla6e2bcdvqhp6tgcknf.apps.googleusercontent.com`}
    >
      <BrowserRouter>
        <Container sx={{ pb: 3 }} maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/" exact="true" element={<Navigate to="/posts" />} />
            <Route path="/posts" exact="true" element={<Home />} />
            <Route path="/posts/search" exact="true" element={<Home />} />
            <Route path="/posts/:id" exact="true" element={<PostDetails />} />
            <Route path="/auth" exact="true" element={<Auth />} />
            {/* <Route
              path="/auth"
              exact="true"
              element={() => (!user ? <Auth /> : <Navigate to="/posts" />)}
            /> */}
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
