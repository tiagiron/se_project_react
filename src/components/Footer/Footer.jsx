// A component that renders meta info about the app: the copyright and the production year. It consists of basic text.
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <span className="footer">
        <p className="footer__text">Developed by Tia Giron</p>
        <p className="footer__text">2024</p>
      </span>
    </footer>
  );
}

export default Footer;
