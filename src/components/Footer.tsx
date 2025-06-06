import {
  FaLinkedinIn,
  FaGithub,
  FaTwitterSquare,
  FaInstagram,
} from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/pratik-r1104/",
    icon: <FaLinkedinIn />,
  },
  { href: "https://github.com/prateekraiger", icon: <FaGithub /> },
  { href: "https://x.com/mrpratik753", icon: <FaTwitterSquare /> },
  { href: "https://instagram.com", icon: <FaInstagram /> },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#5542ff] py-4 sm:py-6 text-[#dfdff0]/[.8]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p className="text-center text-xs sm:text-sm font-light md:text-left transition-colors duration-500 ease-in-out hover:text-white">
          © 2024 BioCraft. All rights reserved
        </p>

        <div className="flex justify-center gap-2 sm:gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dfdff0]/[.8] hover-glow transition-colors duration-500 ease-in-out hover:text-white text-base sm:text-lg"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-xs sm:text-sm font-light hover:underline md:text-right hover:text-white transition-colors duration-500 ease-in-out"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
