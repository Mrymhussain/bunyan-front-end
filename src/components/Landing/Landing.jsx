import { Link } from 'react-router';

import './Landing.css';

const Landing = () => {
  return (
    <main className="landing-page">
      <section className="hero-section">
        <div className="hero-background-word">
          BUNYAN
        </div>

        <div className="hero-grid" />

        <div className="hero-content">
          <p className="hero-eyebrow">
            Engineering & Property Services
          </p>

          <h1>
            Build your vision.
            <span> We connect the pieces.</span>
          </h1>

          <p className="hero-description">
            From engineering projects and consultations
            to specialist services and building materials,
            BUNYAN brings your property journey into one place.
          </p>

          <div className="hero-buttons">
            <Link
              to="/sign-up"
              className="hero-main-button"
            >
              Start Your Journey
              <span>→</span>
            </Link>

            <Link
              to="/sign-in"
              className="hero-outline-button"
            >
              Sign In
            </Link>
          </div>

          <div className="hero-categories">
            <div>
              <strong>01</strong>
              <span>Projects</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Engineers</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Services</span>
            </div>

            <div>
              <strong>04</strong>
              <span>Materials</span>
            </div>
          </div>
        </div>

        <div className="hero-gallery">
          <div className="hero-main-image">
            <img
              src="/images/bunyan-hero.png"
              alt="Modern villa"
            />

            <div className="hero-image-label">
              <span>BUNYAN</span>
              <p>Build. Improve. Connect.</p>
            </div>
          </div>

          <div className="hero-small-image">
            <img
              src="/images/bunyan-interior.png"
              alt="Modern interior"
            />
          </div>

          <div className="floating-info floating-info-top">
            <span>01</span>

            <div>
              <small>Need advice?</small>
              <strong>Book a Consultation</strong>
            </div>
          </div>

          <div className="floating-info floating-info-bottom">
            <span>02</span>

            <div>
              <small>Have a project?</small>
              <strong>Find Professionals</strong>
            </div>
          </div>

          <div className="rotating-badge">
            <div>
              <span>بنيان</span>
              <small>EST. 2026</small>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll</span>
          <div />
        </div>
      </section>

      <section className="marquee-section">
        <div className="marquee-track">
          <span>ENGINEERING</span>
          <b>•</b>

          <span>ARCHITECTURE</span>
          <b>•</b>

          <span>CONSULTATIONS</span>
          <b>•</b>

          <span>SPECIALISTS</span>
          <b>•</b>

          <span>MATERIALS</span>
          <b>•</b>

          <span>SUPPLIERS</span>
          <b>•</b>

          <span>ENGINEERING</span>
          <b>•</b>

          <span>ARCHITECTURE</span>
          <b>•</b>

          <span>CONSULTATIONS</span>
          <b>•</b>

          <span>SPECIALISTS</span>
          <b>•</b>

          <span>MATERIALS</span>
          <b>•</b>

          <span>SUPPLIERS</span>
          <b>•</b>
        </div>
      </section>

      <section className="intro-section">
        <div className="intro-number">
          01
        </div>

        <div className="intro-content">
          <p className="section-eyebrow">
            One connected platform
          </p>

          <h2>
            Your property journey should not
            feel complicated.
          </h2>
        </div>

        <div className="intro-text">
          <p>
            BUNYAN connects clients with engineers,
            specialists, and suppliers while keeping
            projects, consultations, requests, and
            orders organized in one place.
          </p>
        </div>
      </section>

      <section className="showcase-section">
        <article className="showcase-card showcase-large">
          <img
            src="/images/bunyan-engineer.png"
            alt="Engineer"
          />

          <div className="showcase-overlay">
            <span>01</span>

            <div>
              <p>Professional Support</p>
              <h3>Engineers & Consultations</h3>
            </div>

            <div className="showcase-arrow">
              →
            </div>
          </div>
        </article>

        <article className="showcase-card">
          <img
            src="/images/bunyan-interior.png"
            alt="Interior"
          />

          <div className="showcase-overlay">
            <span>02</span>

            <div>
              <p>Improve Your Space</p>
              <h3>Specialist Services</h3>
            </div>

            <div className="showcase-arrow">
              →
            </div>
          </div>
        </article>

        <article className="showcase-card">
          <img
            src="/images/bunyan-materials.png"
            alt="Building materials"
          />

          <div className="showcase-overlay">
            <span>03</span>

            <div>
              <p>Everything You Need</p>
              <h3>Materials & Suppliers</h3>
            </div>

            <div className="showcase-arrow">
              →
            </div>
          </div>
        </article>
      </section>

      <section className="journey-section">
        <div className="journey-heading">
          <p className="section-eyebrow">
            How it works
          </p>

          <h2>
            From idea to reality.
          </h2>
        </div>

        <div className="journey-steps">
          <div className="journey-step">
            <span>01</span>

            <div className="journey-dot" />

            <h3>Choose</h3>

            <p>
              Select a project, consultation,
              specialist service, or material.
            </p>
          </div>

          <div className="journey-step">
            <span>02</span>

            <div className="journey-dot" />

            <h3>Connect</h3>

            <p>
              Find engineers, specialists,
              and suppliers in one platform.
            </p>
          </div>

          <div className="journey-step">
            <span>03</span>

            <div className="journey-dot" />

            <h3>Request</h3>

            <p>
              Submit and manage your request
              directly through BUNYAN.
            </p>
          </div>

          <div className="journey-step">
            <span>04</span>

            <div className="journey-dot" />

            <h3>Track</h3>

            <p>
              Follow your projects, services,
              consultations, and orders.
            </p>
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-word">
          BUNYAN
        </div>

        <div className="closing-content">
          <p>
            Build. Improve. Connect.
          </p>

          <h2>
            Whatever you're building,
            start here.
          </h2>

          <Link
            to="/sign-up"
            className="closing-button"
          >
            Create Your Account
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Landing;