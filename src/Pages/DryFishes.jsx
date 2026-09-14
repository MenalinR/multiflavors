import React from 'react';
import CategoryPage from './CategoryPage';
import dry1 from "../assets/Dryfishes/katta.jpg";
import dry2 from "../assets/Dryfishes/si.jpg";
import dry3 from "../assets/Dryfishes/se.jpg";
import dry4 from "../assets/Dryfishes/sada.jpg";
import dry5 from "../assets/Dryfishes/sp.jpg";
import dry6 from "../assets/Dryfishes/sambol.jpg";
import dry7 from "../assets/Dryfishes/raal.jpg";

const DryFishesData = [
  { id: 1, img: dry1, title: "Katta", type: "weight", price: 4, inStock: true },
  { id: 2, img: dry2, title: "Grey mullet", type: "weight", price: 3, inStock: true },
  { id: 3, img: dry3, title: "Sengani", type: "weight", price: 2.5, inStock: true },
  { id: 4, img: dry4, title: "Atlantic tripletail", type: "weight", price: 3, inStock: true },
  { id: 5, img: dry5, title: "Sprats", type: "weight", price: 2.5, inStock: true },
  { id: 6, img: dry6, title: "Maldive fish sambol", type: "weight", price: 6, inStock: true },
  { id: 7, img: dry7, title: "Raal sambol", type: "weight", price: 3, inStock: false },
];

const DryFishes = ({ addToCart }) => (
  <CategoryPage title="Dry Fish" data={DryFishesData} addToCart={addToCart} />
);

export default DryFishes;
