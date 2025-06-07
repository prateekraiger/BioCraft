import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import BioGenerator from "./components/BioGenerator";
import { AboutPage } from "./pages/AboutPage";
import { Contact } from "./pages/Contact";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <Navbar />
        <main className="flex-grow pt-16 relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/generateBio" element={<BioGenerator />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}
