import styles from "./ProductNavBar.module.css";
import { Link, useLocation } from "react-router-dom";

export default function ProductNavBar() {
  const location = useLocation();
  return (
    <div className={styles.navProducts}>
      <nav>
        <ul>
          <li
            className={
              location.pathname === "/products/proteinpowder"
                ? styles.active
                : ""
            }
          >
            <Link to="/products/proteinpowder">Protein Pulver</Link>
          </li>
          <li
            className={
              location.pathname === "/products/proteinbar" ? styles.active : ""
            }
          >
            <Link to="/products/proteinbar">Protein Riegel</Link>
          </li>
          <li
            className={
              location.pathname === "/products/supplements" ? styles.active : ""
            }
          >
            <Link to="/products/supplements">Supplements</Link>
          </li>
          <li
            className={
              location.pathname === "/products/booster" ? styles.active : ""
            }
          >
            <Link to="/products/booster">Booster</Link>
          </li>
          <li
            className={
              location.pathname === "/products/other" ? styles.active : ""
            }
          >
            <Link to="/products/other">Sonstiges</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
