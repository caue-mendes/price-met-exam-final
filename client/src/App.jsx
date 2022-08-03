import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Post from "./pages/post";
import Edit from "./pages/edit";
import Feed from "./pages/feed";
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Feed />} />
          <Route path="/post" element={<Post />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
