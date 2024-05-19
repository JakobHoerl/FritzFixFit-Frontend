import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.fullLogo}>
      <Link to="/">
        <img
          src="/resources/logo.jpeg"
          alt="FritzFixFitLogo"
          className={styles.logo}
        ></img>
      </Link>
      <Link to="/">
        <div className={styles.logoText}>
          <h2>Fritz</h2>
          <h2>Fix</h2>
          <h2>Fit</h2>
        </div>
      </Link>
    </div>
  );
}
