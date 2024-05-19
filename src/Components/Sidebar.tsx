import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type BasketItem = {
  name: string;
  weight: string;
  price: number;
  vegan: boolean;
  img: string;
  category: string;
  quantity: number;
  initialPrice: number;
  discount: boolean;
};

type SidebarProps = {
  setDisplaySidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setBasketItems: React.Dispatch<React.SetStateAction<BasketItem[]>>;
  basketItems: BasketItem[];
  displaySidebar: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({
  setDisplaySidebar,
  setBasketItems,
  displaySidebar,
  basketItems,
}) => {
  const history = useNavigate();
  const returnProducts = () => {
    setDisplaySidebar((curr) => !curr);
    history("/products");
  };

  const [windowOpacity, setWindowOpacity] = useState(0);
  const total = basketItems.reduce((acc, el) => acc + el.price, 0);
  useEffect(() => {
    const delay = setTimeout(() => {
      setWindowOpacity(1);
    }, 50);

    return () => {
      setWindowOpacity(0);
      clearTimeout(delay);
    };
  }, []);
  return (
    <div
      style={{ opacity: windowOpacity }}
      className={`${styles.wrapper} ${displaySidebar ? styles.active : ""}`}
    >
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h2>Warenkorb</h2>
          <button onClick={() => setDisplaySidebar((curr) => !curr)}>
            &times;
          </button>
        </div>
        <div
          className={
            basketItems.length > 0 ? styles.content : styles.ContentEmpty
          }
        >
          {basketItems.length > 0 ? (
            basketItems.map((el, i) => (
              <SidebarItem
                key={i}
                basketItem={el}
                setBasketItems={setBasketItems}
              />
            ))
          ) : (
            <h4>Ihr Warenkorb ist leer.</h4>
          )}
        </div>
        <div className={styles.bottomContainer}>
          {basketItems.length > 0 ? (
            <Link to="/checkout">
              <button
                onClick={() => setDisplaySidebar(false)}
                className="button-green"
              >
                Zur Kassa
              </button>
            </Link>
          ) : (
            <button className="button-green" onClick={returnProducts}>
              Zu unseren Produkten
            </button>
          )}
          <strong>Gesamt: €{total.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
