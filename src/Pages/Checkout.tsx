import React from "react";
import styles from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
type BasketItem = {
  name: string;
  weight: string;
  price: number;
  vegan: boolean;
  img: string;
  category: string;
  quantity: number;
  initialPrice: number;
};

type CheckoutProps = {
  basketItems: BasketItem[];
};
const Checkout: React.FC<CheckoutProps> = ({ basketItems }) => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleCancel = () => {
    navigate("/");
  };
  const total = basketItems.reduce((acc, el) => acc + el.price, 0);

  return (
    <div className={styles.checkoutWrapper}>
      <div className={styles.checkoutHeader}>
        <h2>Checkout</h2>
        <button onClick={handleCancel}>&times;</button>
      </div>
      <div className={styles.checkoutContent}>
        <div className={styles.items}>
          {basketItems.map((item, index) => (
            <div key={index} className={styles.item}>
              <img src={item.img} alt={item.name} />
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p>Menge: {item.quantity}</p>
                <p>Preis: €{item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value=""
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Addresse"
            value=""
            required
          />

          <button
            onClick={() =>
              alert(
                "Weiter geht es nicht, danke, dass Sie meine Seite so sorgfältig angesehen haben."
              )
            }
            className="button-green"
            type="submit"
          >
            Bestellen
          </button>
        </form>
      </div>
      <div className={styles.checkoutFooter}>
        <p>Gesamt: €{total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Checkout;
