import { useEffect, useState } from "react";

export default function Products({ onEdit }) {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:2000/products");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await res.json();
      if (result.success) {
        setProducts(result.data);
      }

    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products)

  return (
    <>
      <div className="max-w-7xl mx-auto px-12 py-16">
        <h1 className="text-center text-5xl font-extrabold text-slate-800 mb-16">
          List of Products Fetched From the database
        </h1>

        <div className="grid grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col  gap-6 p-8 rounded-xl border-slate-100 bg-white shadow-md "
            >
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">{product.name}</h2>
                <p className="text-base text-slate-600 leading-relaxed">{product.description}</p>
                <p className="text-base text-slate-600">
                  <span className="text-base font-bold">Category : </span>
                  {product.category}
                </p>
                <span className="text-base font-bold text-slate-800">
                  <span className="text-base font-bold">Price: </span>
                  ${product.price}
                </span>
              </div>
              <button
                onClick={() => onEdit(product)}
                className="px-4 py-2 bg-blue-400 text-white rounded-lg cursor-pointer">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}