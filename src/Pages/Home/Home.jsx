import axios from "axios";
import React, {  useEffect, useState } from "react";
import Product from "../../Components/Product/Product";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
    setIsLoading(false);
  }
if(isLoading)
{
return<LoadingScreen/>
}
  return (
    <div>
      <div className="grid sm:grid-cols-2 m-auto md:grid-cols-3 xl:grid-cols-5 gap-4">
        {products.map((product, index) => {
          return <Product key={index} product={product} />;
        })}
      </div>
    </div>
  );
}
