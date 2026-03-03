import React, { useEffect, useState } from "react";
import { FaWikipediaW, FaYoutube } from "react-icons/fa";
import "./Tribes.css";
import "./TribesMobile.css";
import logo from "../../assets/icons/games/tribes.png";

export default function Tribes() {
  const [images, setImages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [expanded, setExpanded] = useState({
    history: false,
    future: false,
  });
  useEffect(() => {
    const importAll = (r) => r.keys().map(r);
    const imgs = importAll(
      require.context(
        "../../assets/images/Screenshots",
        false,
        /\.(png|jpe?g|svg)$/
      )
    );
    setImages(imgs);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [activeIndex, setActiveIndex] = useState(null);
  const slideshowRef = React.useRef();

  const handleImageClick = (index) => {
    const slideshow = slideshowRef.current;
    const img = slideshow.children[index];

    if (activeIndex === index) {
      setActiveIndex(null);
      return;
    }

    setActiveIndex(index);

    const offsetLeft =
      img.offsetLeft - slideshow.offsetWidth / 2 + img.offsetWidth / 2;
    slideshow.scrollTo({
      left: offsetLeft,
      behavior: "smooth",
    });
  };

  const toggleExpanded = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!slideshowRef.current.contains(e.target)) {
        setActiveIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="tribes-page" id="tribes">
      <img src={logo} alt="TRIBES" className="tribes-logo" />
      <div
        className={`slideshow ${activeIndex !== null ? "paused" : ""}`}
        ref={slideshowRef}
      >
        {images.concat(images).map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`tribe-${index}`}
            className={activeIndex === index ? "active" : ""}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
      <section className="tribes-info">
        <div className="history">
          <h2>History of Tribes</h2>
          <p
            className={`tribes-text ${
              isMobile && !expanded.history ? "collapsed" : ""
            }`}
          >
            Tribes started on the 7th of February, 2025. The original name of
            Tribes was Crown in Carnage and was supposed to be a small strategy
            game and our first official Steam release. We started with a team of
            2 people otherwise known as the CEO’s of Catastrophe Studios named
            Arxar(Arda) and Chezzerz(Dillon). Development started amazingly and
            progress was amazing at the start. We got really good feedback from
            our followers and friends and it was an amazing feeling. Eventually
            once the idea of Tribes started becoming bigger we decided to hire
            more people into Tribes and we got a programmer called Alex and a
            musician called Patrick on our team. The team was good and it went
            amazing and we got to a point of releasing our Steam Demo.
            <br /> <br />
            This might have been one of the best feelings when making this game.
            The feedback. The gameplay. Tips and people telling us they see so
            much potential in our game and love it. We even got donations which
            motivated us to work way harder. Eventually Patrick had to drop out
            of our team for personal issues so we decided to expand the team
            once more considering the bigger scope of Tribes and potential the
            game has. <br /> We took on an artist called Ava, 2 programmers
            called Orange and F1nn, and a musician called Joel. Right now we are
            incredibly hard at work at pushing out our second and last demo this
            year. We are hoping that with this team and dedication that soon we
            will release a full version of Tribes somewhere in the first half of
            2026. Thank you all for your support.
          </p>
          {isMobile && (
            <button
              type="button"
              className="read-more"
              onClick={() => toggleExpanded("history")}
            >
              {expanded.history ? "Show less" : "Read more"}
            </button>
          )}
        </div>
        <div className="future-goals">
          <h2>Future Goals</h2>
          <p
            className={`tribes-text ${
              isMobile && !expanded.future ? "collapsed" : ""
            }`}
          >
            Future After releasing Tribes fully we would like to update Tribes
            throughout 2026 to get it to an amazing state and round up the game
            to a good and finished point. (We will still have the option of
            coming back and adding more and we will be working on bug fixes
            ofcourse) <br /> <br /> After Tribes we dont have a set game idea we
            would like to work on. There are tons of game genres and things we
            would like to try and possibly even go back to work on some of our
            older games. We have a high chance to even try out 3D games and very
            different genres from Tribes. However this will all happen according
            to how things go with Tribes and our personal lives.
          </p>
          {isMobile && (
            <button
              type="button"
              className="read-more"
              onClick={() => toggleExpanded("future")}
            >
              {expanded.future ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </section>

      <div className="wishlist">
        <a
          href="https://store.steampowered.com/app/3551950/Tribes/"
          target="_blank"
          rel="noopener noreferrer"
          className="wishlist-button"
        >
          Wishlist Now
        </a>
      </div>

      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/8taukL_xkaI"
          title="Tribes Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="social-icons">
        <FaYoutube size={30} />
        <FaWikipediaW size={30} />
      </div>
    </div>
  );
}
