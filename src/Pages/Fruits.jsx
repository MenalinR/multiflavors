import React from 'react';
import CategoryPage from './CategoryPage';
import frt1 from "../assets/Fruits/dat.jpg";
import frt2 from "../assets/Fruits/plum.png";
import frt3 from "../assets/Fruits/staw.jpeg";
import frt4 from "../assets/Fruits/figs.png";
import frt5 from "../assets/Fruits/apricot.png";

const FruitsData = [
  { id: 1, img: frt1, title: "Dates", type: "weight", price: 2.375, inStock: true },
  { id: 2, img: frt3, title: "Dried Strawberry", type: "weight", price: 2.375, inStock: true },
  { id: 3, img: frt2, title: "Dried plums", type: "weight", price: 2.375, inStock: true },
  { id: 4, img: frt4, title: "Dried Figs", type: "weight", price: 7.6, inStock: true },
  { id: 5, img: frt5, title: "Dried Apricot", type: "weight", price: 7.2, inStock: true },
];

const Fruits = ({ addToCart }) => (
  <CategoryPage
    title="Fruits"
    data={FruitsData}
    addToCart={addToCart}
    weightOptions={[50, 100, 250, 400, 500, 1000]}
  />
);

export default Fruits;
