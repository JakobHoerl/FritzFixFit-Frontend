import React from "react";
import styles from "./Item.module.css";
import { Link } from "react-router-dom";

type Item = {
  name: string;
  weight: string;
  price: number;
  vegan: boolean;
  img: string;
  category: string;
  quantity: number;
};
type ItemProps = {
  product: Item;
  setSelectedItem: React.Dispatch<React.SetStateAction<Item>>;
};

const Item: React.FC<ItemProps> = ({ product, setSelectedItem }) => {
  function selectItem() {
    setSelectedItem({
      name: product.name,
      img: product.img,
      price: product.price,
      weight: product.weight,
      vegan: product.vegan,
      category: product.category,
      quantity: product.quantity,
    });
  }
  return (
    <Link to={`/products/${product.name}`}>
      <div onClick={() => selectItem()} className={styles.items}>
        <div className={styles.imgContainer}>
          <img src={product.img} alt={product.name} />
        </div>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.weight}>{product.weight}</p>

        <p className={styles.price}>Preis: €{product.price.toFixed(2)}</p>

        {product.vegan ? <p className="vegan">Vegan</p> : ""}
      </div>
    </Link>
  );
};

export default Item;
