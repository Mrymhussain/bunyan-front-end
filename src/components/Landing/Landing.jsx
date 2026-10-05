import { Link } from 'react-router';
import './Landing.css';

const Landing = () => {
  return (
    <main className="landing">
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-label">Engineering & Property Services</span>

            <h1>
              Build better with
              <span> BUNYAN.</span>
            </h1>

            <p>
              Connect with engineers, specialists, and trusted suppliers
              for your building and property needs in one place.
            </p>

            <div className="hero-actions">
              <Link to="/sign-up" className="btn-primary">
                Get Started
              </Link>

              <a href="#services" className="btn-secondary">
                Explore Services
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-header">
              <span>BUNYAN</span>
              <span className="status-badge">Simple. Connected.</span>
            </div>

            <div className="hero-option">
              <div className="option-number">01</div>
              <div>
                <h3>Start a Project</h3>
                <p>
                  Plan and manage a complete engineering project.
                </p>
              </div>
            </div>

            <div className="hero-option">
              <div className="option-number">02</div>
              <div>
                <h3>Book a Consultation</h3>
                <p>
                  Connect directly with experienced engineers.
                </p>
              </div>
            </div>

            <div className="hero-option">
              <div className="option-number">03</div>
              <div>
                <h3>Find Services & Materials</h3>
                <p>
                  Find specialists and building materials for your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="container">
          <div className="section-heading">
            <span>What you can do</span>
            <h2>Everything you need to move your property forward</h2>
            <p>
              From the first idea to the finishing touches, BUNYAN brings
              the right people and resources together.
            </p>
          </div>

          <div className="service-grid">
            <article className="service-card">
              <div className="service-number">01</div>
              <h3>Engineering Projects</h3>
              <p>
                Create a project, connect with professionals, and keep
                track of its progress.
              </p>
            </article>

            <article className="service-card">
              <div className="service-number">02</div>
              <h3>Professional Consultations</h3>
              <p>
                Find engineers by specialty and request consultations
                when you need expert guidance.
              </p>
            </article>

            <article className="service-card">
              <div className="service-number">03</div>
              <h3>Specialist Services</h3>
              <p>
                Request help for smaller jobs from trusted specialists
                such as electricians and maintenance professionals.
              </p>
            </article>

            <article className="service-card">
              <div className="service-number">04</div>
              <h3>Building Materials</h3>
              <p>
                Browse materials from suppliers and manage your orders
                directly through BUNYAN.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-container">
          <div>
            <span>Ready to build?</span>
            <h2>Your next project starts here.</h2>
          </div>

          <Link to="/sign-up" className="cta-button">
            Create an Account
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Landing;