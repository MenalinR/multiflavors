import React, { useState, useEffect } from 'react';
import { FaCartPlus } from 'react-icons/fa';

const WEIGHT_OPTIONS = [50, 100, 250, 500, 1000];
const PIECE_OPTIONS = [10, 20, 30, 40, 50];

const ProductPopup = ({ product, handleClose, addToCart, weightOptions = WEIGHT_OPTIONS }) => {
  const isWeight = product.type === 'weight';
  const options = isWeight ? weightOptions : PIECE_OPTIONS;

  const variants = product.variants && product.variants.length > 0 ? product.variants : null;

  const [variantIndex, setVariantIndex] = useState(product.variantIndex || 0);
  const variant = variants ? variants[variantIndex] : { img: product.img, title: product.title, price: product.price };
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  useEffect(() => {
    setTotalPrice((variant.price || 0) * (selectedValue || 1) * quantity);
  }, [variant.price, selectedValue, quantity]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      type: product.type,
      name: variant.title,
      price: variant.price,
      quantity,
      totalPrice,
      selectedValue,
    });
    handleClose();
  };

  const minPrice = isWeight ? 50 * variant.price : 10 * variant.price;
  const maxPrice = isWeight ? 1000 * variant.price : 50 * variant.price;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='relative bg-white p-4 md:p-8 rounded-md w-[90%] md:w-[80%] lg:w-[60%] max-h-[90%] overflow-y-auto flex flex-col md:flex-row z-60'>
        <button
          onClick={handleClose}
          className='absolute top-2 right-2 text-black text-2xl font-bold z-50 md:top-4 md:right-4 md:left-auto sm:top-4'
        >
          &times;
        </button>
        <div className='w-full md:w-1/2 flex flex-col items-center md:pr-8'>
          <img src={variant.img} alt={variant.title} className='w-full h-64 md:h-80 object-cover rounded-lg' />
          {variants && (
            <div className='mt-4 w-full'>
              <label className='block text-sm font-semibold text-gray-600 mb-2'>Choose Type:</label>
              <div className='grid grid-cols-4 gap-3'>
                {variants.map((v, index) => (
                  <button
                    key={index}
                    type='button'
                    onClick={() => setVariantIndex(index)}
                    className={`flex flex-col items-center gap-1 p-1 rounded-md border-2 transition ${
                      variantIndex === index ? 'border-primary' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <img
                      src={v.img}
                      alt={v.title}
                      className='w-16 h-16 object-cover rounded-md shadow-md'
                    />
                    <span className={`text-xs text-center leading-tight ${variantIndex === index ? 'font-semibold text-primary' : 'text-gray-600'}`}>
                      {v.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className='w-full md:w-1/2 flex flex-col'>
          <h2 className='text-2xl font-bold'>{variant.title}</h2>
          <p className='text-lg text-orange-400 font-bold'>
            Rs{minPrice} - Rs{maxPrice}
          </p>
          <label className='block text-lg mt-4'>
            {isWeight ? 'Weight:' : 'Pieces:'}
          </label>
          <div>
            <div className='flex flex-wrap gap-2'>
              {options.map((value) => (
                <button
                  key={value}
                  className={`border p-2 rounded ${selectedValue === value ? 'border-primary' : ''}`}
                  onClick={() => setSelectedValue(value)}
                >
                  {isWeight ? `${value}g` : `${value} pieces`}
                </button>
              ))}
            </div>
            <p className='mt-2'>Price: Rs{variant.price} per {isWeight ? 'gram' : 'piece'}</p>
          </div>

          <div className='mt-4 flex items-center gap-4'>
            <label className='block text-lg'>Quantity:</label>
            <div className='quantity-selector inline-flex items-center border rounded-md'>
              <button onClick={decrementQuantity} className='quantity-button px-4 py-2 rounded-l'>
                -
              </button>
              <input
                type='text'
                value={quantity}
                readOnly
                className='quantity-input p-2 w-16 text-center'
              />
              <button onClick={incrementQuantity} className='quantity-button px-4 py-2 rounded-r'>
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className='bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-md flex items-center justify-center w-full md:w-auto h-full'
            >
              <FaCartPlus className='mr-2' /> Add to Cart
            </button>
          </div>
          <div className='mt-4'>
            <label className='block text-lg'>Total Price:</label>
            <p className='text-xl'>Rs{totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryPage = ({ title, data, addToCart, interactive = true, weightOptions }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-6 text-center'>{title}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {data.map((item) => (
          <div key={item.id} className='bg-white shadow-md rounded-lg overflow-hidden'>
            <img src={item.img} alt={item.title} className='w-full h-56 object-cover' />
            <div className='p-4'>
              {interactive ? (
                <div className='flex justify-between items-center'>
                  <div>
                    <h2 className={`text-xl font-bold ${item.inStock ? 'text-green-500' : 'text-red-500'}`}>
                      {item.title}
                    </h2>
                    <p className={`mt-2 ${item.inStock ? 'text-green-500' : 'text-red-500'}`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(item)}
                    className={`mt-4 px-4 py-2 rounded-md flex items-center gap-2 ${item.inStock ? 'bg-primary text-white' : 'bg-gray-400 cursor-not-allowed'}`}
                    disabled={!item.inStock}
                  >
                    Select
                  </button>
                </div>
              ) : (
                <h3 className='font-semibold text-center'>{item.title}</h3>
              )}
            </div>
          </div>
        ))}
      </div>
      {interactive && selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          handleClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
          {...(weightOptions ? { weightOptions } : {})}
        />
      )}
    </div>
  );
};

export default CategoryPage;
