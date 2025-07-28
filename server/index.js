require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", paymentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
