import React from "react";
import { Link } from "react-router-dom";

import styles from "./Homepage.module.css";

import ItemHomepage from "../Components/ItemHomepage";
type BestSeller = {
  name: string;
  weight: string;
  price: number;
  vegan: boolean;
  img: string;
  category: string;
  quantity: number;
};

type HomepageProps = {
  username: string;
  bestSeller: BestSeller[];
  setSelectItem: React.Dispatch<React.SetStateAction<BestSeller>>;
};

const Homepage: React.FC<HomepageProps> = ({
  setSelectItem,
  bestSeller,
  username,
}) => {
  return (
    <>
      <div>
        <div className={styles.homepage}></div>
        <div className={styles.image}>
          <div className={styles.content}>
            <h1 className={styles.header}>{`Willkommen ${username}`}</h1>
            <h2>Fritz Fix Fit Supplement Store</h2>

            <Link to="/products">
              <button className={styles.button}>Zu unseren Produkten</button>
            </Link>
          </div>
          <div className={styles.stripe}></div>
          <div className={styles.imgContainer}>
            <img src="/resources/Logo2.jpeg" />
          </div>
        </div>
        <div className={styles.title}>
          <h1>Unsere Bestseller</h1>
        </div>
        <div className={styles.bestSeller}>
          {bestSeller.map((el, i) => (
            <ItemHomepage
              product={el}
              setSelectedItem={setSelectItem}
              key={i}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
