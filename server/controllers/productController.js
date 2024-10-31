const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  const Products = await prisma.products.findMany();

  res.status(200).json(Products);
};

const addProduct = async (req, res) => {
  const { name, quantity, price } = req.body;

  try {
    const newProd = await prisma.products.create({
      data: {
        name: name,
        quantity: quantity,
        price: price,
      },
    });
    res.status(200).json(newProd);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
};
