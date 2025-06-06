import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import BioGeneratorPage from "@/pages/BioGeneratorPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/generator" element={<BioGeneratorPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
