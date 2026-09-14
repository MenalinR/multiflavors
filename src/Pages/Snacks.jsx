import React from 'react';
import CategoryPage from './CategoryPage';
import snk1 from "../assets/Snacks/snk1.jpg";
import snk2 from "../assets/Snacks/snk2.jpeg";
import snk3 from "../assets/Snacks/snk3.jpg";
import snk5 from "../assets/Snacks/snk5.jpg";
import snk6 from "../assets/Snacks/snk6.jpg";
import snk7 from "../assets/Snacks/snk7.jpg";
import snk8 from "../assets/Snacks/snk8.jpg";
import snk9 from "../assets/Snacks/snk9.jpg";

const SnacksData = [
  { id: 1, img: snk1, title: "Spicy Muruku", type: "weight", price: 2.5, inStock: true },
  { id: 2, img: snk2, title: "Thenkuzhal Muruku", type: "weight", price: 12, inStock: false },
  { id: 3, img: snk3, title: "strip Muruku", type: "weight", price: 2, inStock: true },
  { id: 4, img: snk5, title: "Sweet Murukku", type: "weight", price: 2.5, inStock: true },
  { id: 5, img: snk6, title: "Snack", type: "weight", price: 0.7, inStock: false },
  { id: 6, img: snk7, title: "Pakoda", type: "weight", price: 2, inStock: true },
  { id: 7, img: snk8, title: "Point pedro Vadai", type: "weight", price: 2, inStock: true },
  { id: 8, img: snk9, title: "Snack", type: "weight", price: 0.9, inStock: false },
];

const Snacks = ({ addToCart }) => (
  <CategoryPage title="Snacks" data={SnacksData} addToCart={addToCart} />
);

export default Snacks;
