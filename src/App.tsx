import { Route, Routes } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";

import CalorieCalculator from "./Pages/CalorieCalculator";
import Products from "./Pages/Products";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Homepage from "./Pages/Homepage";
import CaloieCalculatorStep1 from "./Pages/CalorieCalculatorStep1";
import CalorieCalculatorFinal from "./Pages/CalorieCalculatorFinal";
import productItems from "./Products/Products.json";
import SelectedItem from "./Components/SelectedItem";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Checkout from "./Pages/Checkout";
import Footer from "./Components/Footer";

const products = productItems.products;

interface State {
  weight: number;
  height: number;
  age: number;
  activityLevel: string;
  gender: string;
  renders: number;
}
type Product = {
  name: string;
  weight: string;
  price: number;
  vegan: boolean;
  img: string;
  category: string;
  quantity: number;
};

type Action = { type: "submit"; payload: State };

const initialState = {
  weight: 0,
  height: 0,
  age: 0,
  activityLevel: "none",
  gender: "none",
  renders: 0,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "submit":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedItem, setSelectedItem] = useState<Product | null>(() => {
    const storedSelectedItem = localStorage.getItem("selectedItem");
    return storedSelectedItem ? JSON.parse(storedSelectedItem) : null;
  });
  const [basketItems, setBasketItems] = useState<Product[]>(() => {
    const storedBasketItems = localStorage.getItem("basketItems");
    return storedBasketItems ? JSON.parse(storedBasketItems) : [];
  });
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedItems, setSearchedItems] = useState<Product[]>([]);
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });

  const bestSeller = [products[4], products[9], products[products.length - 4]];
  const itemsWhey = products.filter((el) => el.category === "Protein-Powder");
  const itemsBar = products.filter((el) => el.category === "Protein-Bar");
  const itemsBooster = products.filter((el) => el.category === "Booster");
  const itemsSupplements = products.filter(
    (el) => el.category === "Supplement"
  );
  const itemsOther = products.filter((el) => el.category === "Other");
  useEffect(() => {
    const storedBasketItems = localStorage.getItem("basketItems");
    if (storedBasketItems) {
      setBasketItems(JSON.parse(storedBasketItems));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
  }, [basketItems]);

  useEffect(() => {
    localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
  }, [selectedItem]);

  useEffect(() => {
    if (displaySidebar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [displaySidebar]);

  useEffect(() => {
    const filteredItems = products.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (searchQuery === "") setSearchedItems([]);
    else setSearchedItems(filteredItems);
  }, [searchQuery, products]);

  return (
    <>
      {displaySidebar && (
        <Sidebar
          basketItems={basketItems}
          setDisplaySidebar={setDisplaySidebar}
          setBasketItems={setBasketItems}
          displaySidebar={displaySidebar}
        />
      )}{" "}
      {displaySidebar && (
        <div
          onClick={() => setDisplaySidebar((curr) => !curr)}
          className="overlay"
        ></div>
      )}
      <Navbar
        username={username}
        products={searchedItems}
        displayDot={basketItems.length}
        searchQuery={searchQuery}
        setUsername={setUsername}
        setDisplaySidebar={setDisplaySidebar}
        setSearchQuery={setSearchQuery}
        setSelectedItem={setSelectedItem}
        setSearchedItems={setSearchedItems}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              username={username}
              bestSeller={bestSeller}
              setSelectItem={setSelectedItem}
            />
          }
        />
        <Route
          path="checkout"
          element={<Checkout basketItems={basketItems} />}
        />
        <Route path="calculator" element={<CalorieCalculator />} />
        <Route
          path="calculator/input"
          element={<CaloieCalculatorStep1 dispatch={dispatch} state={state} />}
        />
        <Route
          path="calculator/final"
          element={<CalorieCalculatorFinal state={state} />}
        />

        <Route
          path="products"
          element={
            <Products setSelectedItem={setSelectedItem} products={products} />
          }
        />
        <Route
          path="products/proteinpowder"
          element={
            <Products setSelectedItem={setSelectedItem} products={itemsWhey} />
          }
        />
        <Route
          path="products/proteinbar"
          element={
            <Products setSelectedItem={setSelectedItem} products={itemsBar} />
          }
        />
        <Route
          path="products/booster"
          element={
            <Products
              setSelectedItem={setSelectedItem}
              products={itemsBooster}
            />
          }
        />
        <Route
          path="products/supplements"
          element={
            <Products
              setSelectedItem={setSelectedItem}
              products={itemsSupplements}
            />
          }
        />
        <Route
          path="products/other"
          element={
            <Products setSelectedItem={setSelectedItem} products={itemsOther} />
          }
        />

        <Route
          path="products/:name"
          element={
            <SelectedItem
              selectedItem={selectedItem}
              setBasketItems={setBasketItems}
              setDisplaySidebar={setDisplaySidebar}
            />
          }
        />

        <Route
          path="login"
          element={<Login username={username} setUsername={setUsername} />}
        />
        <Route path="signup" element={<SignUp setUsername={setUsername} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
