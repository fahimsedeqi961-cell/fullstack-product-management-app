import express from "express";
import Product from "../models/products.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Not Products Found",
        data: []
      });
    }
    res.status(200).json({
      success: true,
      message: "All products fetched successfully.",
      data: products
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: err.message
    })
  }
});

// Add new product
router.post("/addproduct", async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(200).json({ message: "Prodcut allready exist" });
    }

    const newProduct = new Product({
      name,
      description,
      category,
      price
    })
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    })
  }
});


// Update the existing product

router.put("/update/:id", async (req, res) => {
  try {

    const { id } = req.params;
    const { name, description, category, price } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, category, price },
      { new: true }
    );

    /* const { id, name, description, category, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, category, price },
      { new: true }
    ); */

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Updated Successfully",
      data: updatedProduct
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    })
  }
});

// Delete the prodcut 

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Deleted Successfully"
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    })
  }
})

export default router;