import React from "react";
import { Route } from "react-router-dom";
import Home from "../mainPages/Home";
import Signup from "../mainPages/Signup";
import Dashboard from "../mainPages/Dashboard";
import NotFound from "../mainPages/NotFound";

export const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="*" element={<NotFound />} />
  </>
);
