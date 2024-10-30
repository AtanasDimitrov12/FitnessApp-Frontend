import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-area">
        <div className="container-fluid">
          <div className="footer-row">
            <div className="footer-cta">
              <p>Ready to <span className="cta-highlight">start?</span></p>
              <Link to="/register" className="cta-button">Join now</Link>
            </div>
            <div className="footer-links">
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
            <div className="footer-copyright">
              <p>&copy; {new Date().getFullYear()} Fitness App. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
