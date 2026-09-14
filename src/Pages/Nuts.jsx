import React from 'react';
import CategoryPage from './CategoryPage';
import nut1 from "../assets/Nuts/nut1.jpg";
import nut2 from "../assets/Nuts/nut2.jpg";
import nut3 from "../assets/Nuts/nut3.jpg";
import nut4 from "../assets/Nuts/nut4.jpg";
import nut5 from "../assets/Nuts/nut5.jpg";
import nut6 from "../assets/Nuts/nut6.jpeg";
import rel1 from "../assets/Nuts/s.cashew.jpg";
import rel2 from "../assets/Nuts/SC.png";
import rel3 from "../assets/Nuts/RCN.png";

const cashewVariants = [
  { img: nut1, title: "Oven Cashews", price: 7.2 },
  { img: rel1, title: "Spicy Cashews", price: 8.6 },
  { img: rel2, title: "Salted Cashews", price: 8.6 },
  { img: rel3, title: "Roasted Cashews", price: 8.6 },
];

// One "Cashews" card in the grid. Its popup lets you switch between the
// four cashew types (Oven, Spicy, Salted, Roasted) in a fixed order.
const cashewsCard = {
  id: 'cashews',
  img: cashewVariants[0].img,
  title: "Cashews",
  type: "weight",
  price: cashewVariants[0].price,
  inStock: true,
  variants: cashewVariants,
  variantIndex: 0,
};

const NutsData = [
  cashewsCard,
  { id: 5, img: nut2, title: "Peanuts", type: "weight", price: 1.5, inStock: true },
  { id: 6, img: nut3, title: "Pistachios", type: "weight", price: 7.6, inStock: true },
  { id: 7, img: nut4, title: "Almonds", type: "weight", price: 5, inStock: true },
  { id: 8, img: nut5, title: "Walnuts", type: "weight", price: 5, inStock: true },
  { id: 9, img: nut6, title: "Mixed Nuts", type: "weight", price: 8, inStock: true },
];

const Nuts = ({ addToCart }) => (
  <CategoryPage title="Nuts" data={NutsData} addToCart={addToCart} />
);

export default Nuts;
