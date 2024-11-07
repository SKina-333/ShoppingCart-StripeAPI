const express = require('express');

const {
    getCartItems,
    addItemCart,
    buyItems,
    clearCart,
  } = require('../controllers/cartController');


const router = express.Router();

router.get('/',getCartItems);
router.post('/',addItemCart);
router.post("/clear", clearCart);
router.post('/buy',buyItems);


module.exports = router