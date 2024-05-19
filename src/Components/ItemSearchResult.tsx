import React from "react";
import styles from "./ItemSearchResult.module.css";
import { Link } from "react-router-dom";

type ItemSearch = {
  name: string;
  weight: string;
  price: number;
  vegan: boolean;
  img: string;
  category: string;
  quantity: number;
};
type ItemSearchProps = {
  product: ItemSearch;
  setSelectedItem: React.Dispatch<React.SetStateAction<ItemSearch>>;
  setDisplaySearch: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const Item: React.FC<ItemSearchProps> = ({
  product,
  setSelectedItem,
  setSearchQuery,
  setDisplaySearch,
}) => {
  function selectItem() {
    setDisplaySearch((curr) => !curr);
    setSearchQuery("");
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
        <div className={styles.weightPrice}>
          <p className={styles.weight}>{product.weight}</p>
          <p className={styles.price}>€{product.price}0</p>
        </div>

        {product.vegan ? <p className="vegan">Vegan</p> : ""}
      </div>
    </Link>
  );
};

export default Item;
