"use client";

import { useEffect } from "react";

export default function Home() {
  //
  // ---------------------- SCRIPT LOADING ----------------------
  //
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
    script2.async = true;

    const script3 = document.createElement("script");
    script3.src =
      "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js";
    script3.async = true;

    const script4 = document.createElement("script");
    script4.src = "/vulkans.js";
    script4.async = true;
    script4.onload = () => {
      if (window.gsap && window.ScrollTrigger && window.Lenis) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        window.initVulkans();
      }
    };

    document.body.appendChild(script1);
    document.body.appendChild(script2);
    document.body.appendChild(script3);
    setTimeout(() => document.body.appendChild(script4), 100);

    return () => {
      try {
        document.body.removeChild(script1);
        document.body.removeChild(script2);
        document.body.removeChild(script3);
        if (document.body.contains(script4)) {
          document.body.removeChild(script4);
        }
      } catch {}
    };
  }, []);

  //
  // ---------------------- FORM HANDLER ----------------------
  //
  useEffect(() => {
    const form = document.getElementById("applicationForm") as HTMLFormElement | null;
    const lava = document.getElementById("lava-overlay");

    if (!form) return;

    const handleSubmit = async (e: Event) => {
      e.preventDefault();

      const ign = (document.getElementById("ign") as HTMLInputElement).value;
      const playtime = (document.getElementById("playtime") as HTMLInputElement).value;
      const tier = (document.getElementById("tier") as HTMLSelectElement).value;
      const reason = (document.getElementById("reason") as HTMLTextAreaElement).value;
      const discord = (document.getElementById("discord") as HTMLInputElement).value;

      const data = new FormData();
      data.append("entry.28427024", ign);
      data.append("entry.506936599", playtime);
      data.append("entry.366075710", tier);
      data.append("entry.600611479", reason);
      data.append("entry.467929086", discord);

      const googleFormURL =
        "https://docs.google.com/forms/d/e/1FAIpQLSezMwARbglbhUjtFE_qh-4tkkrllf8NBdm9QzjOMqI1iMMzwg/formResponse";

      try {
        await fetch(googleFormURL, {
          method: "POST",
          mode: "no-cors",
          body: data,
        });
      } catch {}

      // Lava animation
      if (lava) {
        lava.classList.add("lava-active");
        setTimeout(() => lava.classList.remove("lava-active"), 1500);
      }

      // Scroll
      setTimeout(() => {
        document.getElementById("roster")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    };

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, []);

  //
  // ---------------------- UI ----------------------
  //
  return (
    <>
      {/* Lava Overlay */}
      <div id="lava-overlay" className="lava-overlay"></div>

      {/* ---------------------- PRELOADER ---------------------- */}
      <div id="preloader">
        <div className="preloader-content">
          <div className="preloader-logo">V</div>
          <div className="preloader-text">VULKANS</div>
          <div className="loading-bar-container">
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
            <span className="loading-percent">0%</span>
          </div>
        </div>
      </div>

      <div id="main-content" className="opacity-0">
        <div className="fixed-background"></div>
        <div className="mesh-background">
          <canvas id="meshCanvas"></canvas>
        </div>

        {/* ---------------------- HERO ---------------------- */}
        <section id="hero" className="hero-section">
          <div className="hero-content">
            <div className="hero-top-text">
              <span>Crystal PvP Elite</span>
            </div>
            <h1 className="hero-title">VULKANS</h1>
            <p className="hero-subtitle">India&apos;s Most Advanced Crystal PvP Clan</p>

            <div className="cta-buttons">
              <button
                className="cta-btn primary"
                onClick={() => window.open("https://discord.gg/5jNUC9fU8E", "_blank")}
              >
                Join Now
              </button>

              <button
                className="cta-btn secondary"
                onClick={() => {
                  const aboutSection = document.getElementById("about");
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* ---------------------- ABOUT ---------------------- */}
        <section id="about" className="about-section">
          <div className="about-container">
            <h2 className="section-title">About Vulkans</h2>

            <div className="about-content">
              <div className="about-card glass-card">
                <h3>Elite Precision</h3>
                <p>
                  India's most elite Crystal PvP clan, built on discipline, precision, and
                  mastery.
                </p>
              </div>

              <div className="about-card glass-card">
                <h3>Performance-Based</h3>
                <p>
                  Every member is selected through intensive trials and mechanical testing.
                </p>
              </div>

              <div className="about-card glass-card">
                <h3>The Future</h3>
                <p>
                  Leading the next generation of Indian competitive Crystal PvP gameplay.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------- ROSTER ---------------------- */}
        <section id="roster" className="roster-section">
          <h2 className="section-title">Team Roster</h2>

          {/* HT3 */}
          <div className="tier-group">
            <h3 className="tier-name">HT3 — Elite PvP</h3>

            <div className="players-grid">
              {[
                "HYPERizOP",
                "KillxrW",
                "HerculesTheG0at",
                "ItzEeu",
                "69cent_",
                "Chodubikal",
                "V1per_V1",
                "Fizzlitt",
                "Samradhh",
                "Skiligga",
                "D1xxy",
                "Kartik",
              ].map((n, i) => (
                <div key={i} className="player-card glass-card">
                  <p className="player-name">{n}</p>
                  <span className="tier-badge ht3">HT3</span>
                </div>
              ))}
            </div>
          </div>

          {/* LT3 */}
          <div className="tier-group">
            <h3 className="tier-name">LT3 — Advanced PvP</h3>

            <div className="players-grid">
              {[
                "Rbcauxe",
                "xKazuto",
                "sssaaamm_alt1",
                "Karyl",
                "KingGyro",
                "Prax",
                "Sn0w",
                "StevePubgYT",
                "CrystalUwU",
                "qhexxi",
                "YellowFl4sh",
                "Rynoxx",
                "Vinziety",
                "0xPH0SIS",
                "Ripjust",
                "Vexqrds",
                "Tacoitalian",
                "D4vil",
                "SparkyTheGoat",
              ].map((n, i) => (
                <div key={i} className="player-card glass-card">
                  <p className="player-name">{n}</p>
                  <span className="tier-badge lt3">LT3</span>
                </div>
              ))}
            </div>
          </div>

          {/* MOST ACTIVE */}
          <div className="tier-group">
            <h3 className="tier-name">TEAM MOST ACTIVE PLAYERS</h3>

            <div className="players-grid">
              {["Prakash_Playz", "GAMINGOCOOKED"].map((n, i) => (
                <div key={i} className="player-card glass-card">
                  <p className="player-name">{n}</p>
                  <span className="tier-badge ht5">HT5</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------- APPLY SECTION ---------------------- */}
        <section id="apply" className="apply-section">
          <div className="apply-container">
            <h2 className="section-title">Join Vulkans</h2>

            <form id="applicationForm" className="apply-form glass-card">
              <div className="form-group">
                <label htmlFor="ign">Player IGN</label>
                <input id="ign" required placeholder="Your in-game name" />
              </div>

              <div className="form-group">
                <label htmlFor="playtime">Playtime/Week</label>
                <input type="number" id="playtime" required placeholder="20" />
              </div>

              <div className="form-group">
                <label htmlFor="tier">Current Tier</label>
                <select id="tier" required>
                  <option value="">Select...</option>
                  <option value="HT3">HT3</option>
                  <option value="LT3">LT3</option>
                  <option value="LT2">LT2</option>
                  <option value="HT4">HT4</option>
                  <option value="LT4">LT4</option>
                  <option value="HT5">HT5</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="reason">Why do you want to join?</label>
                <textarea id="reason" rows={4} required />
              </div>

              <div className="form-group">
                <label htmlFor="discord">Discord Username</label>
                <input id="discord" required placeholder="example#1234" />
              </div>

              <button type="submit" className="submit-btn">
                Submit Application
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p>© 2025 VULKANS. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
