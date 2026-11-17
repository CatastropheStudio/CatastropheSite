import React, { useState, useEffect } from "react";
import {
  FaYoutube,
  FaDiscord,
  FaTiktok,
  FaInstagram,
  FaPatreon,
} from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer className={`footer px-8 py-12 ${isMobile ? "footer-mobile" : ""}`}>
      <p className="text-center italic mb-6">"Making games both fun and with chaos!"</p>
      <div className="socials">
        <a
          href="https://www.youtube.com/@CatastropheStudiosAC"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FaYoutube />
        </a>
        <a
          href="https://www.discord.gg/twbPKAHRNy"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FaDiscord />
        </a>
        <a
          href="https://www.tiktok.com/@tribesgame"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FaTiktok />
        </a>
        <a
          href="https://www.instagram.com/tribesgame/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.patreon.com/CatastropheStudiosDEV"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FaPatreon />
        </a>
      </div>
      <p className="text-center text-sm mt-6">©Catastrophe Studios 2025- F1nn</p>
    </footer>
  );
}

