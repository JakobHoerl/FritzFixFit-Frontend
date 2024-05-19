import React from "react";
import styles from "./SelectedItem.module.css";

import ProductNavBar from "./ProductNavBar";

type SelectedItem = {
  name: string;
  weight: string;
  price: number;
  vegan: boolean;
  img: string;
  category: string;
  quantity: number;
};
type SelectedItemProps = {
  selectedItem: SelectedItem;
  setBasketItems: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
  setDisplaySidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SelectedItem: React.FC<SelectedItemProps> = ({
  selectedItem,
  setBasketItems,
  setDisplaySidebar,
}) => {
  const addBasketItem = () => {
    setBasketItems((curr) => {
      if (
        curr.some(
          (item) =>
            item.name === selectedItem.name &&
            item.weight === selectedItem.weight
        )
      ) {
        alert("Der Gegenstand befindet sich bereits im Warenkorb");
        return curr;
      }
      setDisplaySidebar(true);
      const updatedBasketItems = [
        ...curr,
        { ...selectedItem, initialPrice: selectedItem.price },
      ];
      localStorage.setItem("basketItems", JSON.stringify(updatedBasketItems)); // Add basket items to local storage
      return updatedBasketItems;
    });
  };

  return (
    <>
      <ProductNavBar />

      <div className={styles.wrapper}>
        <div className={styles.selectedItem}>
          <div className={styles.selectedItemImgContainer}>
            <img src={selectedItem.img} alt={selectedItem.name} />
          </div>
          <div className={styles.content}>
            <h1>{selectedItem.name}</h1>
            <div className={styles.mid}>
              <h3>€{selectedItem.price}0</h3>
              <h3>{selectedItem.weight}</h3>
              {selectedItem.vegan && <p className="vegan">Vegan</p>}
            </div>

            <button className="button-green" onClick={addBasketItem}>
              Zum Warenkorb hinzufügen
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedItem;
