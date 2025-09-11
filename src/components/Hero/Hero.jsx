import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <h1>Find your perfect rental car</h1>
        <p>Reliable and budget-friendly rentals for any journey</p>
        <Link to="/catalog" className={styles.ctaBtn}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}
