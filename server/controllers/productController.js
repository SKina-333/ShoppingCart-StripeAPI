
const { PrismaClient } = require("@prisma/client");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  const Products = await prisma.products.findMany();
  res.status(200).json(Products);
};

const addProduct = async (req, res) => {
  const { name, quantity, price } = req.body;

  const priceInt = parseInt(price, 10);
  const quantityInt = parseInt(quantity, 10);
  if (isNaN(priceInt) || isNaN(quantityInt)) {
    return res
      .status(400)
      .json({ error: "Invalid input: price and quantity must be integers" });
  }
  const { file } = req;
  

  try {
    const filePath = req.file ? req.file.path : null;
    

    // Create a new product entry in PostgreSQL
    const newProd = await prisma.products.create({
      data: {
        name,
        quantity: quantityInt,
        price: priceInt,
        file_path: filePath , // Store the public URL in the database
      },
    });

    res.status(201).json(newProd); // Return the newly created product
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

module.exports = {
  getProducts,
  addProduct,
};
