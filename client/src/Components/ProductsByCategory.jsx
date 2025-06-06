import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../Context/Context";
import Card from "./Card";

function ProductsByCategory() {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const params = useParams();
  const { Authentication } = useContext(Context);
  const getProductByCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/product/getProductByCategory/${params.category}`,
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
      setCategoryProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductByCategory();
  }, [params.category]);

  return (
    <div className="min-h-screen bg-[#f9f4ef] py-10 px-6">
      <h1 className="text-3xl font-bold text-[#4b2e2e] text-center mb-8 capitalize">
        {params.category} Delights
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categoryProducts.map((product) => (
          <Card
            onDelete={() =>
              setCategoryProducts((prev) =>
                prev.filter((p) => p._id !== product._id)
              )
            }
            key={product._id}
            id={product._id}
            url={product.attachments.url}
            name={product.productName}
            description={product.category}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsByCategory;
