import React, { useEffect, useState } from "react";
import { timelineData, games } from "../../data/AboutData";
import { profiles } from "../../data/ProjectData";
import "./About.css";
import "./AboutMobile.css";
import teamlogo from "../../assets/images/Profile/logo.png";
import teamgif from "../../assets/images/Profile/teamgif.gif";

function TeamGif() {
  const [isPlaying, setIsPlaying] = useState(false);
  const handleClick = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 6000);
  };

  return (
    <div
      className="team-logo"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img
        src={isPlaying ? teamgif : teamlogo}
        alt="Team Logo"
        className="team-logo-image"
      />
    </div>
  );
}
export default function About() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 700);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return (
    <div className={isMobile ? "mobile-container" : "desktop-container"}>
      <section className="about-intro" id="about">
        <h1>About Us</h1>
        <p>
          Arda and Dillon started making games in 2023. The first game they made
          together was "Willy’s Wonderful Wonders" for the Winter MelonJam 2023.
          This was the first game they worked on together.
          <br /> <br />
          Near the end of 2024, they decided to start their own studio called
          "Catastrophe Studios" and began working on their story game called
          "Blood Tied". The game was supposed to be a story game that you play
          with two people, where you commit crimes to build your own story by
          making the right or “wrong” choices. Eventually, they realized that
          the game was out of their reach and that the vision was too big for a
          team of two people. <br /> <br />
          On February 2nd, 2025, they started working on "Tribes". They saw this
          as a smaller project and the game they wanted to be their first
          commercial Steam release — a strategy game designed to be played by
          everyone and adaptable to each player’s playstyle. At the moment, the
          team is composed of seven people working at Catastrophe Studios,
          making amazing progress and closing in on a full release in 2026.
        </p>
      </section>

      <section className="timeline-section">
        <div className="journey-header">
          <h2>Our Journey</h2>
        </div>
        <div className="timeline">
          {timelineData.map((event, index) => {
            const left = (index / (timelineData.length - 1)) * 100;
            const isAbove = index % 2 === 0;
            return (
              <div
                key={index}
                className={`timeline-item ${isAbove ? "above" : "below"}`}
                style={{ left: `${left}%` }}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-info">
                  <h3>{event.year}</h3>
                  <p>{event.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="games-section">
        <div className="game-header">
          <h2>Game catalogue</h2>
        </div>
        <div className="games-grid">
          {games.map((game, index) => (
            <div key={index} className="game-card">
              <img src={game.image} alt={game.name} className="game-image" />
              <h3>{game.name}</h3>
              <p>{game.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="team-section">
        <div className="profiles-container">
          <div className="team-logo">
            <TeamGif />
          </div>

          <div className="team-header">
            <h2>Meet our team</h2>
          </div>
          {profiles.map((profile, index) => (
            <div key={index} className="profile-card">
              <img
                src={profile.image}
                alt={profile.name}
                className="profile-pic"
              />
              <div className="profile-info">
                <div className="profile-text">
                  <h2 className="profile-name">{profile.name}</h2>
                  <p className="profile-job">{profile.job}</p>
                </div>
                <p className="profile-description">{profile.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
