import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/home";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<HomeScreen />} />
    </Routes>
  </Router>
);

export default AppRoutes;
