import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserList from "./UserList";
import UserPage from "./UserPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/userPage/:id" element={<UserPage />} />
    </Routes>
  </BrowserRouter>
);
