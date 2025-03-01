import axios from "axios";
import React, { useEffect, useState } from "react";
import CartProduct from "../../Components/cartProduct/cartProduct";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartId, setCartId] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [numOfCartItem, setNumOfCartItem] = useState(null);

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  async function getLoggedUserCart() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    setCartId(data.cartId);
    setCartData(data.data);
    setNumOfCartItem(data.numOfCartItems);
  }

  async function removeCartProduct(productId) {
    const data = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    setCartData(data.data);
    setNumOfCartItem(data.numOfCartItems);
  }

  async function clearCart() {
    const data = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    setCartData(null);
    setNumOfCartItem(0);
  }
  function updateCartProductQuantity(
    productId,
    count,
    setdecrementIsloading,
    setIncrementIsloading,
    currentCount
  ) {
    if (count > currentCount) {
      setIncrementIsloading(true);
    }
    if (count < currentCount) {
      setdecrementIsloading(true);
    }

    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        setCartId(data.cartId);
        setCartData(data.data);
        setNumOfCartItem(data.numOfCartItems);
      })
      .finally(() => {
        setIncrementIsloading(false);
        setdecrementIsloading(false);
      });
  }

  if (!cartData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
        <div className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                Shopping Cart
              </h2>
              <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                {numOfCartItem} Items
              </h2>
            </div>
            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
              <div className="col-span-12 md:col-span-7">
                <p className="font-normal text-lg leading-8 text-gray-400">
                  Product Details
                </p>
              </div>
              <div className="col-span-12 md:col-span-5">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                      Quantity
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                      Total
                    </p>
                  </div>
                </div>
              </div>
            </div>

         
            {cartData?.products && cartData.products.length > 0 ? (
              cartData.products.map((product) => (
                <CartProduct
                  key={product.id}
                  product={product}
                  removeCartProduct={removeCartProduct}
                  updateCartProductQuantity={updateCartProductQuantity}
                />
              ))
            ) : (
              <div>No products in your cart.</div>
            )}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={clearCart}
                className="flex items-center px-5 py-3 rounded-full gap-2 border-none outline-0 group font-semibold text-lg leading-8 text-red-500 shadow-sm shadow-transparent transition-all duration-500 hover:text-red-700"
              >
                {" "}
                clear Cart
              </button>

              <button className="flex items-center px-5 py-3 rounded-full gap-2 border-none outline-0 group font-semibold text-lg leading-8 text-indigo-600 shadow-sm shadow-transparent transition-all duration-500 hover:text-indigo-700">
                {" "}
                Add Coupon Code
                <svg
                  className="transition-all duration-500 group-hover:translate-x-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                    stroke="#4F46E5"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Summary sidebar */}
          <div className="sticky col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
            <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
              Order Summary
            </h2>
            <div class="mt-8">
              <div class="flex items-center justify-between pb-6">
                <p class="font-normal text-lg leading-8 text-black">
                  {numOfCartItem} Items
                </p>
                <p class="font-medium text-lg leading-8 text-black">
                  ${cartData?.totalCartPrice}
                </p>
              </div>
              <form>
                <div class="flex pb-6">
                  <div class="relative w-full">
                    <div class=" absolute left-0 top-0 py-3 px-4"></div>
                  </div>
                </div>

                <div class="flex pb-4 w-full">
                  <div class="relative w-full ">
                    <div class=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                  </div>
                </div>
                <div class="flex items-center border-b border-gray-200">
                  <button class="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">
                    Apply
                  </button>
                </div>
                <div class="flex items-center justify-between py-8">
                  <p class="font-medium text-xl leading-8 text-black">
                    {numOfCartItem} Items
                  </p>
                  <p class="font-semibold text-xl leading-8 text-indigo-600">
                    ${cartData?.totalCartPrice}
                  </p>
                </div>
                <Link
                  to={"/adress/" + cartId}
                  className="w-full block
                   text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
