//Imports
require("dotenv").config();
const express = require("express");





//Middleware imports
const corsConfig = require('./middlewares/cors');
const sessionConfig = require("./configs/express-session");
const productRouter = require("./routers/productRouter");
const cartRouter = require("./routers/cartRouter");


//Application
const app = express();
const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});



//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsConfig);
app.use(sessionConfig);
app.use('/products', productRouter)
app.use('/cart', cartRouter)


//Routers
app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
});







