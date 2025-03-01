

import React from "react";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../Services/AddTocart";
import { Button } from "@heroui/react";

export default function Product({ product }) {
  // Function to handle the addition of product to the cart
  const handleAddToCart = async () => {
    try {
      await addProductToCart(product._id); // Add product to cart
      // Optional: Any additional action after product is added
    } catch (error) {
      // Handle any errors here if needed
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="relative pb-2 flex w-full justify-between flex-col overflow-hidden rounded-lg border border-gray-500 bg-white shadow-md duration-300 hover:scale-[105%]">
      <Link to={"/product/" + product._id}>
        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl shadow-md duration-300 hover:scale-[110%]">
          <img
            className="object-contain w-full object-center"
            src={product.imageCover}
            alt={product.title}
          />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            39% OFF
          </span>
        </div>
        <div className="mt-4 px-5 pb-0">
          <h5 className="text-xl tracking-tight text-slate-900 line-clamp-1">
            {product.title}
          </h5>
          <p className="text-sm text-slate-600 line-clamp-3">
            {product.description}
          </p>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-[15px] font-bold text-slate-900">
                {product.price}
              </span>
              <span className="text-sm text-slate-900 line-through">
                {product.price + 5}
              </span>
            </p>
            <div className="flex items-center">
              {/* Dynamic Star Rating */}
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  aria-hidden="true"
                  className={`h-5 w-5 ${index < product.rating ? "text-yellow-300" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                {product.rating}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="m-4">
        <Button
          onPress={handleAddToCart}
          color="primary"
          className="mt-4 w-full hover:bg-primary-100"
          startContent={<i className="fa-solid fa-cart-shopping"></i>}
          variant="bordered"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
