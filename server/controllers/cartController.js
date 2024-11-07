require("dotenv").config();

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_PUBLICKEY);

const getCartItems = async (req, res) => {
  console.log("Session data:", req.session);
  res.status(200).json({
    cart: req.session.cart || [],
  });
};

const addItemCart = async (req, res) => {
  const { name, price, quantity } = req.body;
  if (!req.session.cart) {
    req.session.cart = [];
  }
  try {
    // Find the item in the cart
    const existingItem = req.session.cart.find(
      (item) => item.price_data.product_data.name === name
    );

    if (existingItem) {
      // If item exists, increase quantity
      existingItem.quantity += quantity;
    } else {
      // Add new item to cart
      req.session.cart.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: name,
          },
          unit_amount: price * 100,
        },
        quantity: quantity,
      });
    }

    req.session.save((err) => {
      if (err) {
        console.error("Error saving session:", err);
        return res.status(500).json({ error: "Failed to save session" });
      }
      res.status(200).json({ cart: req.session.cart });
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(400).json({ error: "Failed to add item to cart" });
  }
};

const clearCart = async (req, res) => {
  try {
    
    req.session.cart = [];
    req.session.save((err) => {
      if (err) {
        console.error("Error saving session:", err);
        return res.status(500).json({ error: "Failed to clear cart" });
      }
      res.status(200).json({ message: "Cart cleared successfully" });
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
};

const buyItems = async (req, res) => {
  const cart = req.session.cart || [];
  if (cart.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  try {
    const lineItems = cart.map((item) => ({
      price_data: {
        currency: item.price_data.currency,
        product_data: {
          name: item.price_data.product_data.name,
        },
        unit_amount: item.price_data.unit_amount,
      },
      quantity: item.quantity,
    }));

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment", // or 'subscription' if applicable
      success_url: "http://localhost:5173/product/show-all", // URL to redirect to after successful payment
      cancel_url: "http://localhost:5173", // URL to redirect to after payment cancellation
    });

    const checkoutUrl = session.url;
    console.log("Stripe Checkout URL:", checkoutUrl);

    // Send the checkout URL as part of the response
    res.status(200).json({ message: "Checkout session created", checkoutUrl });
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

module.exports = {
  getCartItems,
  addItemCart,
  buyItems,
  clearCart,
};
