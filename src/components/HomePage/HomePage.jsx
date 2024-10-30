import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./HomePage.css";
import FeatureCard from "./FeatureCard";
import VideoSection from "./VideoSection";
import StepCard from "./StepCard";

const HomePage = () => {
  const mainContentRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2, // Trigger when 20% of the element is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elements = mainContentRef.current.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right");

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  return (
    <div id="home-page" ref={mainContentRef}>
      <div className="main-content">
        {/* Video Hero Section */}
        <section className="video-hero-section fade-in">
          <div className="hero-content slide-in-left">
            <h1>
              <span className="highlight">Transform</span> Your Fitness Journey
            </h1>
            <p>Our fitness app helps you create a custom workout and diet plan tailored to your goals.</p>
            <div className="cta-container">
              <Link to="/register" className="cta-button">
                Get started
              </Link>
            </div>
          </div>
          <div className="video-container slide-in-right">
            <VideoSection />
          </div>
        </section>

        {/* Features Section */}
        <section className="features fade-in">
          <h2>Features</h2>
          <div className="feature-list">
            <FeatureCard title="Create Your Account" description="Sign up to personalize your fitness experience." />
            <FeatureCard title="Workout & Diet Plans" description="Get a customized workout and diet plan based on your preferences." />
            <FeatureCard title="Track Your Progress" description="Log your achievements and monitor your progress over time." />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works fade-in">
          <h2>How It Works</h2>
          <div className="how-it-works-content">
            <div className="how-it-works-image slide-in-left">
              <img src="/images/workout-card.jpg" alt="Gym equipment" />
            </div>
            <div className="how-it-works-steps slide-in-right">
              <StepCard
                stepNumber="1"
                title="Sign Up"
                description="Create an account and start your fitness journey."
              />
              <StepCard
                stepNumber="2"
                title="Set Your Preferences"
                description="Choose workout and diet preferences to customize your plan."
                highlight
              />
              <StepCard
                stepNumber="3"
                title="Track & Improve"
                description="Log progress notes, and the app will generate helpful insights."
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage
