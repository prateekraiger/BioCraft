import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full bg-white/70 backdrop-blur-md border-t border-black/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-black/70">
              © {new Date().getFullYear()} BioCraft. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/prateekraiger"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/70 hover:text-black transition-colors duration-300 transform hover:scale-110"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/mrpratik753"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/70 hover:text-black transition-colors duration-300 transform hover:scale-110"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/pratik-r1104/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/70 hover:text-black transition-colors duration-300 transform hover:scale-110"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/pratik.raiger"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/70 hover:text-black transition-colors duration-300 transform hover:scale-110"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <Link
              to="/privacy"
              className="text-sm text-black/70 hover:text-black transition-colors duration-300"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
