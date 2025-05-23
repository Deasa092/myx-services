const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/v1/auth', require('./routes/authRoutes'))
app.use('/api/v1/user', require('./routes/userRoutes'))
connectDb()

const PORT = process.env.PORT || 5000
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to Myx's Server</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.white.bgYellow);
});
