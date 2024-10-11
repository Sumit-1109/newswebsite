import React from "react";
import Nav from "./Nav";
import Card from "./Card";
import { useState } from "react";
import "./news.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function News() {
  const [category, setCategory] = useState("general");
  const [query, setQuery] = useState("");
  return (
    <BrowserRouter>
      <div className="news">
        <Nav setCategory={setCategory} setQuery={setQuery} />
        <div className="main">
          <Routes>
            <Route path="/" element={<Card category={category} query={""} />} />
            <Route
              path="/business"
              element={<Card category={category} query={""} />}
            />
            <Route
              path="/entertainment"
              element={<Card category={category} query={""} />}
            />
            <Route
              path="/health"
              element={<Card category={category} query={""} />}
            />
            <Route
              path="/science"
              element={<Card category={category} query={""} />}
            />
            <Route
              path="/sports"
              element={<Card category={category} query={""} />}
            />
            <Route
              path="/technology"
              element={<Card category={category} query={""} />}
            />
            <Route
              path="/search-request"
              element={<Card category={"general"} query={query} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default News;
