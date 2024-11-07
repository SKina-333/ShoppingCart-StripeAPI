const express = require("express");
const multer = require("multer");
const { getProducts, addProduct } = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "product_images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });
const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), addProduct);

module.exports = router;
