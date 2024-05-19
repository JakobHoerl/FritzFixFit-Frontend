import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import styles from "./Icons.module.css";

type IconsProps = {
  setDisplaySearchBar: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplaySidebar: React.Dispatch<React.SetStateAction<boolean>>;
  displayDot: number;
};

const Icons: React.FC<IconsProps> = ({
  setDisplaySearchBar,
  displayDot,
  setDisplaySidebar,
}) => {
  return (
    <div className={styles.icons}>
      <FaSearch
        onClick={() => setDisplaySearchBar((curr) => !curr)}
        size={24}
        className={styles.search}
      />
      <div>
        {displayDot > 0 && <div className={styles.dot}></div>}
        <MdOutlineShoppingCart
          size={34}
          onClick={() => setDisplaySidebar((curr) => !curr)}
          className={styles.cart}
        />
      </div>
    </div>
  );
};

export default Icons;
