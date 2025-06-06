import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import BioGeneratorPage from "@/pages/BioGeneratorPage";
import { InteractiveGrid } from "@/components/ui/interactive-grid";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <InteractiveGrid className="fixed inset-0 z-0" />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="generator" element={<BioGeneratorPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
