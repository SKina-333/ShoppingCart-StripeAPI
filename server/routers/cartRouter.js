const express = require('express');

const {
    getCartItems,
    addItemCart,
  } = require('../controllers/cartController');


const router = express.Router();

router.get('/',getCartItems);
router.post('/',addItemCart);


module.exports = router