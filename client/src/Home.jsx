import { useState } from "react";
import AddProduct from "./AddProduct";
import Products from "./Products";
import Navbar from "./Navbar";

export default function Home() {
  const [mode, setMode] = useState("add");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <>
      <Navbar
        onAdd={() => {
          setMode("add");
          setSelectedProduct(null);
          setIsOpen(true);
        }}
      />

      <Products
        onEdit={(product) => {
          setMode("update");
          setSelectedProduct(product);
          setIsOpen(true);
        }}
      />

      {isOpen && (
        <AddProduct
          mode={mode}
          product={selectedProduct}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}