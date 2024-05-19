import React from "react";
import styles from "./SidebarItem.module.css";

type SidebarItem = {
  name: string;
  weight: string;
  price: number;
  vegan: boolean;
  img: string;
  category: string;
  quantity: number;
  initialPrice: number;
};
type SidebarItemProps = {
  basketItem: SidebarItem;
  setBasketItems: React.Dispatch<React.SetStateAction<SidebarItem[]>>;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  basketItem,
  setBasketItems,
}) => {
  if (basketItem.quantity === 0)
    setBasketItems((curr) => curr.filter((el) => el.name !== basketItem.name));
  const adjustQuantityAndPrice = (increment: number) => {
    setBasketItems((prevBasketItems) =>
      prevBasketItems.map((item) =>
        item.name === basketItem.name
          ? {
              ...item,
              quantity: item.quantity + increment,
              price: item.price + increment * item.initialPrice,
            }
          : item
      )
    );
  };
  const adjustInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (isNaN(newQuantity)) return;

    setBasketItems((prevBasketItems) =>
      prevBasketItems.map((item) =>
        item.name === basketItem.name
          ? {
              ...item,
              quantity: newQuantity,
              price: newQuantity * item.initialPrice,
            }
          : item
      )
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.sideBarItemContainer}>
        <img src={basketItem.img}></img>
      </div>
      <div className={styles.content}>
        <h4 className={styles.name}>{basketItem.name}</h4>
        {basketItem.vegan && <p className={styles.vegan}>Vegan</p>}
        <p className={styles.weight}>{basketItem.weight}</p>
        <div className={styles.quantityPrice}>
          <div className={styles.quantity}>
            <button onClick={() => adjustQuantityAndPrice(-1)}>-</button>
            <input
              onChange={(e) => adjustInput(e)}
              value={basketItem.quantity}
              min="1"
            />
            <button onClick={() => adjustQuantityAndPrice(1)}>+</button>
          </div>
          <p>€{basketItem.initialPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarItem;
