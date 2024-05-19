import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "./Logo";
import Icons from "./Icons";
import Searchbar from "./Searchbar.js";
import ShowHamburgerMenu from "./ShowHamburgerMenu.js";
import axios from "axios";

type ProductsNav = {
  name: string;
  weight: string;
  price: number;
  vegan: boolean;
  img: string;
  category: string;
  quantity: number;
};

type NavbarProps = {
  username: string;
  displayDot: number;
  products: ProductsNav[];
  searchQuery: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setDisplaySidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<ProductsNav>>;
  setSearchedItems: React.Dispatch<React.SetStateAction<ProductsNav[]>>;
};

const Navbar: React.FC<NavbarProps> = ({
  username,
  displayDot,
  products,
  searchQuery,
  setUsername,
  setDisplaySidebar,
  setSearchQuery,
  setSelectedItem,
  setSearchedItems,
}) => {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://fritzfixfit-backend-production.up.railway.app/logout"
      );
      if (response.status === 200) {
        localStorage.setItem("username", "");
        setUsername("");
        navigate("/");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const onClickOverlay = () => {
    setDisplaySearchBar((curr) => !curr);
    setSearchedItems([]);
    setSearchQuery("");
  };

  useEffect(() => {
    if (displaySearchBar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [displaySearchBar]);

  return (
    <>
      {!displaySearchBar ? (
        <nav className={styles.nav}>
          <Logo />
          <div className={styles.navLinks}>
            <button
              className={styles.hamburger}
              onClick={() => setShowLinks(!showLinks)}
            >
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </button>
            {showLinks && (
              <ShowHamburgerMenu
                username={username}
                setUsername={setUsername}
                setShowLinks={setShowLinks}
                showLinks={showLinks}
              />
            )}

            <ul className={showLinks ? styles.show : ""}>
              <li>
                <Link to="/calculator">Kalorienrechner</Link>
              </li>
              <li>
                <Link to="/products">Produkte</Link>
              </li>
              <li>
                {username ? (
                  <button className={styles.logout} onClick={handleLogout}>
                    {`Logout (${username})`}
                  </button>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </div>
          <Icons
            setDisplaySearchBar={setDisplaySearchBar}
            displayDot={displayDot}
            setDisplaySidebar={setDisplaySidebar}
          />
        </nav>
      ) : (
        <Searchbar
          products={products}
          searchQuery={searchQuery}
          setDisplaySearchBar={setDisplaySearchBar}
          setSearchQuery={setSearchQuery}
          setSelectedItem={setSelectedItem}
          setSearchedItems={setSearchedItems}
        />
      )}
      {displaySearchBar && (
        <div onClick={onClickOverlay} className="overlay"></div>
      )}
    </>
  );
};

export default Navbar;
