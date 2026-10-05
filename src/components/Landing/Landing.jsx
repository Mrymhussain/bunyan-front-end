import { Link } from 'react-router';
import './Landing.css';

const Landing = () => {
  return (
    <main className="landing">
      <section className="hero">
        <div className="hero-shape hero-shape-one"></div>
        <div className="hero-shape hero-shape-two"></div>

        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Engineering & Property Services
            </div>

            <h1>
              From an idea
              <br />
              to something
              <span> built.</span>
            </h1>

            <p className="hero-description">
              BUNYAN connects clients with engineers, specialists,
              and trusted suppliers to make building and property
              services easier from start to finish.
            </p>

            <div className="hero-actions">
              <Link to="/sign-up" className="hero-primary">
                Start Building
                <span>→</span>
              </Link>

              <a href="#services" className="hero-secondary">
                Explore BUNYAN
              </a>
            </div>

            <div className="hero-trust">
              <div>
                <strong>01</strong>
                <span>Projects</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Experts</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Materials</span>
              </div>

              <div>
                <strong>04</strong>
                <span>One Platform</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-main-card">
              <div className="visual-top">
                <div>
                  <span className="small-label">PROJECT OVERVIEW</span>
                  <h3>Modern Villa</h3>
                </div>

                <span className="active-status">In Progress</span>
              </div>

              <div className="progress-section">
                <div className="progress-info">
                  <span>Project progress</span>
                  <strong>72%</strong>
                </div>

                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              </div>

              <div className="visual-grid">
                <div className="visual-item">
                  <span className="visual-icon">A</span>
                  <div>
                    <small>Architect</small>
                    <strong>Assigned</strong>
                  </div>
                </div>

                <div className="visual-item">
                  <span className="visual-icon">C</span>
                  <div>
                    <small>Civil</small>
                    <strong>Assigned</strong>
                  </div>
                </div>

                <div className="visual-item">
                  <span className="visual-icon">E</span>
                  <div>
                    <small>Electrical</small>
                    <strong>Pending</strong>
                  </div>
                </div>

                <div className="visual-item">
                  <span className="visual-icon">I</span>
                  <div>
                    <small>Interior</small>
                    <strong>Assigned</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-card floating-card-one">
              <span className="floating-icon">✓</span>
              <div>
                <small>Consultation</small>
                <strong>Confirmed</strong>
              </div>
            </div>

            <div className="floating-card floating-card-two">
              <span className="material-circle"></span>
              <div>
                <small>Material Order</small>
                <strong>On the way</strong>
              </div>
            </div>

            <div className="floating-line line-one"></div>
            <div className="floating-line line-two"></div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span></span>
          Scroll to explore
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">ONE PLATFORM</span>
              <h2>
                Everything your
                <br />
                property needs.
              </h2>
            </div>

            <p>
              Whether you are starting a complete project or simply
              need one specialist, BUNYAN helps you find the right
              service and keep everything organized.
            </p>
          </div>

          <div className="services-grid">
            <article className="service-card service-large">
              <div className="service-top">
                <span className="service-index">01</span>
                <span className="service-arrow">↗</span>
              </div>

              <div className="service-content">
                <span className="service-symbol">⌂</span>
                <h3>Full Projects</h3>
                <p>
                  Build your project with multiple engineering
                  disciplines and follow its progress in one place.
                </p>
              </div>
            </article>

            <article className="service-card">
              <div className="service-top">
                <span className="service-index">02</span>
                <span className="service-arrow">↗</span>
              </div>

              <div className="service-content">
                <span className="service-symbol">◌</span>
                <h3>Consultations</h3>
                <p>
                  Find engineers by specialty and schedule professional
                  consultations.
                </p>
              </div>
            </article>

            <article className="service-card">
              <div className="service-top">
                <span className="service-index">03</span>
                <span className="service-arrow">↗</span>
              </div>

              <div className="service-content">
                <span className="service-symbol">✦</span>
                <h3>Specialists</h3>
                <p>
                  Request electricians, installers, maintenance
                  specialists, and other professionals.
                </p>
              </div>
            </article>

            <article className="service-card service-wide">
              <div className="service-top">
                <span className="service-index">04</span>
                <span className="service-arrow">↗</span>
              </div>

              <div className="service-content">
                <span className="service-symbol">▦</span>
                <h3>Materials Marketplace</h3>
                <p>
                  Browse building materials from suppliers, place
                  orders, and keep track of them through BUNYAN.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <div className="process-heading">
            <span className="section-label">HOW IT WORKS</span>
            <h2>One simple journey.</h2>
          </div>

          <div className="process-line">
            <div className="process-step">
              <span>01</span>
              <div className="process-dot"></div>
              <h3>Tell us what you need</h3>
              <p>
                Start a project, consultation, service request,
                or material order.
              </p>
            </div>

            <div className="process-step">
              <span>02</span>
              <div className="process-dot"></div>
              <h3>Connect</h3>
              <p>
                Find the right engineer, specialist, or supplier
                for your request.
              </p>
            </div>

            <div className="process-step">
              <span>03</span>
              <div className="process-dot"></div>
              <h3>Track everything</h3>
              <p>
                Follow your requests, progress, appointments,
                and orders from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <div className="cta-card">
            <div className="cta-decoration"></div>

            <div>
              <span className="cta-label">BUNYAN</span>
              <h2>
                Your next project
                <br />
                starts with one step.
              </h2>
            </div>

            <Link to="/sign-up" className="cta-link">
              Create Account
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;