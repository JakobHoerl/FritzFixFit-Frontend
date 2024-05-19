import { useEffect, useState } from "react";
import Item from "../Components/Item";
import ProductNavBar from "../Components/ProductNavBar";
import styles from "./Products.module.css";

type Product = {
  name: string;
  weight: string;
  price: number;
  vegan: boolean;
  img: string;
  category: string;
  quantity: number;
};
type ProductsProps = {
  products: Product[];
  setSelectedItem: React.Dispatch<React.SetStateAction<Product>>;
};

const Products: React.FC<ProductsProps> = ({ products, setSelectedItem }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <ProductNavBar />
      <div className={styles.wrapper}>
        {loading ? (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
          </div>
        ) : (
          <div className={styles.container}>
            {products.map((el, i) => (
              <Item product={el} key={i} setSelectedItem={setSelectedItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
