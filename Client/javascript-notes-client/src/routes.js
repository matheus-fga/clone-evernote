import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/home";
import NotesScreen from "./screens/notes/index";
import RegisterScreen from "./screens/auth/register";
import LoginScreen from "./screens/auth/login";
import UsersEditScreen from "./screens/users/edit";
import PrivateRoute from "./components/auth";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<HomeScreen />} />
      <Route exact path="/register" element={<RegisterScreen />} />
      <Route exact path="/login" element={<LoginScreen />} />
      <Route exact path="/notes" element={<PrivateRoute />}>
        <Route exact path="/notes" element={<NotesScreen />} />
      </Route>
      <Route exact path="/users/edit" element={<PrivateRoute />}>
        <Route exact path="/users/edit" element={<UsersEditScreen />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
