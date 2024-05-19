import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ShowHamburgerMenu.module.css";
import axios from "axios";

type ShowHamburgerProps = {
  username: string;
  showLinks: boolean;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setShowLinks: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowHamburgerMenu: React.FC<ShowHamburgerProps> = ({
  username,
  showLinks,
  setUsername,
  setShowLinks,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (showLinks) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [showLinks]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://fritzfixfit-backend-production.up.railway.app/logout"
      );
      if (response.status === 200) {
        localStorage.setItem("username", "");
        setUsername("");
        setShowLinks(false);
        navigate("/");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      {showLinks && (
        <div
          className={styles.overlay}
          onClick={() => setShowLinks(false)}
        ></div>
      )}
      <div className={showLinks ? styles.container : styles.hidden}>
        <button
          className={styles.closeButton}
          onClick={() => setShowLinks(false)}
        >
          &times;
        </button>
        <Link onClick={() => setShowLinks(false)} to="/calculator">
          <p>Kalorienrechner</p>
        </Link>
        <Link onClick={() => setShowLinks(false)} to="/products">
          <p>Produkte</p>
        </Link>
        {username ? (
          <a>
            <p onClick={handleLogout}>{`Logout (${username})`}</p>
          </a>
        ) : (
          <Link to="./login" onClick={() => setShowLinks(false)}>
            <p>Login</p>
          </Link>
        )}
      </div>
    </>
  );
};

export default ShowHamburgerMenu;
