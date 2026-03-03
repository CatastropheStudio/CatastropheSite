import { useEffect, useRef, useState } from "react";
import "./SkyScroll.css";
import cloudImg from "../../assets/images/Background/cloud.png";
import mountainImg from "../../assets/images/Background/mountain2.png";
import groundImg from "../../assets/images/Background/grass2.png";

export default function SkyScroll() {
  const skyRef = useRef(null);
  const layers = useRef({
    cloud: null,
    mountain: null,
    ground: null,
  });

  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    if (active) return;
    let ticking = false;

    const updateParallax = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 300;
      const progress = Math.min(scrollTop / maxScroll, 1);

      const night = [20, 30, 60];
      const day = [135, 206, 235];
      const r = Math.round(night[0] + (day[0] - night[0]) * progress);
      const g = Math.round(night[1] + (day[1] - night[1]) * progress);
      const b = Math.round(night[2] + (day[2] - night[2]) * progress);

      const cloudLayer = layers.current.cloud;
      const mountainLayer = layers.current.mountain;
      const groundLayer = layers.current.ground;

      if (skyRef.current)
        skyRef.current.style.background = `rgb(${r}, ${g}, ${b})`;
      if (cloudLayer) {
        cloudLayer.style.transform = `translate3d(var(--base-x), ${
          scrollTop * 0.5
        }px, 0)`;
      }
      if (mountainLayer) {
        mountainLayer.style.transform = `translate3d(var(--base-x), ${
          scrollTop * 0.2
        }px, 0)`;
      }
      const minBrightness = 0.6;
      const mountainBrightness = (
        minBrightness +
        (1 - minBrightness) * progress
      ).toFixed(3);
      if (mountainLayer) {
        mountainLayer.style.setProperty(
          "--mountain-brightness",
          mountainBrightness
        );
      }
      if (groundLayer) {
        const groundDelta = 0.6;
        const groundBrightness = Math.min(
          parseFloat(mountainBrightness) + groundDelta,
          1
        ).toFixed(3);
        groundLayer.style.setProperty("--ground-brightness", groundBrightness);
        groundLayer.style.transform = `translate3d(var(--base-x), ${
          scrollTop * 0.3
        }px, 0)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    updateParallax();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active, isMobile]);

  const handleClick = (name) => {
    if (active === name) {
      setActive(null);
      document.body.style.overflow = "auto";
    } else {
      setActive(name);
      document.body.style.overflow = "hidden";
      const element = layers.current[name];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  useEffect(() => {
    if (isMobile) return;
    const exitZoom = (e) => {
      if (!skyRef.current || !skyRef.current.contains(e.target)) return;
      if (e.target.tagName !== "IMG") {
        setActive(null);
        document.body.style.overflow = "auto";
      }
    };
    window.addEventListener("click", exitZoom);
    return () => window.removeEventListener("click", exitZoom);
  }, []);

  if (isMobile) {
    return (
      <div className="sky-hero" aria-hidden="true">
        <div className="sky-hero-glow" />
        <div className="sky-hero-orb" />
        <div className="sky-hero-haze" />
        <div className="sky-hero-band" />
      </div>
    );
  }

  return (
    <div ref={skyRef} className="sky-scroll">
      <div
        className={`layer cloud ${active === "cloud" ? "active" : ""}`}
        ref={(el) => (layers.current.cloud = el)}
        onClick={() => handleClick("cloud")}
      >
        <img src={cloudImg} alt="Cloud" />
      </div>
      <div
        className={`layer mountain ${active === "mountain" ? "active" : ""}`}
        ref={(el) => (layers.current.mountain = el)}
        onClick={() => handleClick("mountain")}
      >
        <img src={mountainImg} alt="Mountain" />
      </div>
      <div
        className={`layer ground ${active === "ground" ? "active" : ""}`}
        ref={(el) => (layers.current.ground = el)}
        onClick={() => handleClick("ground")}
      >
        <img src={groundImg} alt="Ground" />
      </div>
    </div>
  );
}
