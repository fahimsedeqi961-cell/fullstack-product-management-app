import { useState, useEffect } from "react"

export default function AddProduct({ mode, product, onClose }) {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: ""
  });

  useEffect(() => {
    if (mode === "update" && product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price || ""
      });
    } else {
      // reset for add mode
      setFormData({
        name: "",
        description: "",
        category: "",
        price: ""
      });
    }
  }, [product, mode]);


  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const url = mode === "add"
    ? "http://localhost:2000/addproduct"
    : `http://localhost:2000/update/${product._id}`


  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const body = mode === "add" ? formData : { ...formData };

      const res = await fetch(url, {
        method: mode === "add" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        throw new Error("Fialed to add product");
      }

      else {
        const data = await res.json();
        console.log(res.status);
        console.log(data);
        if (mode === "add" ? alert("Prodcut added successfully") : alert("Prodcut updated successfully"));
        setFormData({
          name: "",
          description: "",
          category: "",
          price: ""
        });

        onClose();
      }

    } catch (err) {
      console.error(err);
      alert("An error occured");
    }
  }


  return (
    <>
      {/* Model for adding or updating the new product */}
      <div
        className={`absolute top-30 left-100  transition-opacity duration-500`}
      >
        <form
          onSubmit={handleAddProduct}
          className="flex flex-col items-center gap-12 rounded-2xl border bg-gray-50 p-8 border-slate-100 w-150 h-[70vh] max-w-7xl mx-auto  shadow-sm backdrop:blur-5xl"
        >
          <h1 className="text-3xl font-bold text-slate-700 text-center">
            {mode === "add" ? "Add New Product" : "Update Existing Product"}
          </h1>
          <div className="grid grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              placeholder="product"
              className="p-2 col-span-2 border border-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleOnChange}
              placeholder="Category"
              className="p-2 border border-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleOnChange}
              placeholder="price"
              className="p-2 border border-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleOnChange}
              placeholder="Description"
              className="p-2 col-span-2 border border-slate-400 rounded-xl"
            />

          </div>
          <div className="flex gap-8 items-center justify-between">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-400 rounded-md text-white font-bold hover:bg-blue-500 cursor-pointer">
              {mode === "add" ? "Add Product" : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}