const getCartItems = async (req, res) => {
  res.status(200).json({ 
    sessionCookie: req.session,
    cart: req.session.cart || [] 
});
};

const addItemCart = async (req, res) => {
  const { id, quantity } = req.body;
  if (!req.session.cart) req.session.cart = [];
  try {
    const existingItem = req.session.cart.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      req.session.cart.push({ id, quantity });
    }

    res.status(200).json({ cart: req.session.cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCartItems,
  addItemCart,
};
