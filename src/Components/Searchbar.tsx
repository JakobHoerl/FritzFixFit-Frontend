import styles from "./Searchbar.module.css";
import { FaSearch } from "react-icons/fa";
import ItemSearchResult from "./ItemSearchResult";
type ProductsSearchbar = {
  name: string;
  weight: string;
  price: number;
  vegan: boolean;
  img: string;
  category: string;
  quantity: number;
};
type SearchbarProps = {
  setDisplaySearchBar: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<ProductsSearchbar>>;
  setSearchedItems: React.Dispatch<React.SetStateAction<ProductsSearchbar[]>>;
  products: ProductsSearchbar[];
  searchQuery: string;
};

const Searchbar: React.FC<SearchbarProps> = ({
  setDisplaySearchBar,
  setSearchQuery,
  setSelectedItem,
  setSearchedItems,
  products,
  searchQuery,
}) => {
  const onClick = () => {
    setDisplaySearchBar((curr) => !curr);
    setSearchedItems([]);
    setSearchQuery("");
  };
  return (
    <div className={styles.searchbar}>
      <div className={styles.content}>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Suchen Sie nach Produkten"
        />
        <p onClick={onClick}>&times;</p>
      </div>
      {searchQuery !== "" ? (
        <div className={styles.output}>
          {products.length === 0 ? (
            <h4>Keine Produkte gefunden</h4>
          ) : (
            products.map((el, i) => (
              <ItemSearchResult
                product={el}
                key={i}
                setSelectedItem={setSelectedItem}
                setDisplaySearch={setDisplaySearchBar}
                setSearchQuery={setSearchQuery}
              />
            ))
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Searchbar;
