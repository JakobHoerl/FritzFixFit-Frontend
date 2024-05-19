import React from "react";
import styles from "./AskLogin.module.css";
import { Link } from "react-router-dom";

type AskLoginProps = {
  setShowAskLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const AskLogin: React.FC<AskLoginProps> = ({ setShowAskLogin }) => {
  return (
    <div>
      <div className={styles.askLogin}>
        <button
          onClick={() => setShowAskLogin((curr) => !curr)}
          className={styles.closeButton}
        >
          &times;
        </button>
        <p>Welcome to Frit's Fix Fitz SupplementStore!</p>
        <p>
          You are currently not logged in.{" "}
          <Link to="/login" onClick={() => setShowAskLogin((curr) => !curr)}>
            <strong>Login here</strong>
          </Link>
        </p>
        <p>
          New here?{" "}
          <Link to="/signup" onClick={() => setShowAskLogin((curr) => !curr)}>
            <strong>Register here</strong>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default AskLogin;
