// corsConfig.js
const cors = require('cors');

const corsOptions = {
    origin: "http://localhost:5173",  // Your frontend URL
    credentials: true,
};

module.exports = cors(corsOptions);