import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <GoogleOAuthProvider
      // clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}
      clientId={`725090806564-mq7nq9iv7vlqrla6e2bcdvqhp6tgcknf.apps.googleusercontent.com`}
    >
      <BrowserRouter>
        <Container sx={{ pb: 3 }} maxWidth="lg">
          <Navbar />
          <Routes>
            <Route path="/" exact="true" element={<Home />} />
            <Route path="/auth" exact="true" element={<Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
