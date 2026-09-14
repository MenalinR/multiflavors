import React from 'react';
import CategoryPage from './CategoryPage';
import snk5 from "../assets/Snacks/snk5.jpg";
import snk8 from "../assets/Snacks/snk8.jpg";
import dry1 from "../assets/Dryfishes/sambol.jpg";
import swt1 from "../assets/Sweets/swt4.jpg";
import snk7 from "../assets/Snacks/snk7.jpg";

const NewArrivalData = [
  { id: 1, img: snk5, title: "Sweet Murukku" },
  { id: 2, img: snk8, title: "Point pedro Vadai" },
  { id: 3, img: dry1, title: "Maldive fish sambol" },
  { id: 4, img: swt1, title: "Dates Sweet" },
  { id: 5, img: snk7, title: "Pakoda" },
];

const NewArrivals = () => (
  <CategoryPage title="New Arrivals" data={NewArrivalData} interactive={false} />
);

export default NewArrivals;
