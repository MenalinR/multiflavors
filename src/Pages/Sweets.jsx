import React from 'react';
import CategoryPage from './CategoryPage';
import swt1 from "../assets/Sweets/swt1.jpg";
import swt2 from "../assets/Sweets/swt2.jpg";
import swt3 from "../assets/Sweets/swt3.jpg";
import swt4 from "../assets/Sweets/swt4.jpg";
import nutsBar from "../assets/Sweets/nutsbar.jpg";

const SweetsData = [
  { id: 1, img: swt1, title: "Laddu", type: "pieces", price: 50, inStock: true },
  { id: 2, img: swt2, title: "Milk Toffee", type: "pieces", price: 50, inStock: true },
  { id: 3, img: swt3, title: "Rich Cake", type: "pieces", price: 220, inStock: false },
  { id: 4, img: swt4, title: "Dates Sweet", type: "pieces", price: 60, inStock: true },
  { id: 'nut-bar', img: nutsBar, title: "Nut Bar", type: "pieces", price: 450, inStock: true, pieceOptions: [5, 10, 20, 30, 40, 50] },
];

const Sweets = ({ addToCart }) => (
  <CategoryPage title="Sweets" data={SweetsData} addToCart={addToCart} />
);

export default Sweets;
