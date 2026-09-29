"use client";

import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

export default function ProductManager() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleProductCreated() {
    setRefreshKey((current) => current + 1);
  }

  return (
    <>
      <ProductForm onProductCreated={handleProductCreated} />

      <ProductList refreshKey={refreshKey} />
    </>
  );
}