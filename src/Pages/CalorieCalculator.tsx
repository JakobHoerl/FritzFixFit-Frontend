import styles from "./CalorieCalculator.module.css";
import { Link } from "react-router-dom";

export default function CalorieCalculator() {
  return (
    <>
      <div className={styles.calorieCalculator}>
        <h2>Kalorienrechner</h2>
        <h3>
          Berechnen Sie Ihren täglichen Kalorienbedarf um Ihr gewünschtes Ziel
          zu erreichen.
        </h3>
        <Link to="/calculator/input">
          <button className="button-green">Los gehts</button>
        </Link>
      </div>
    </>
  );
}
