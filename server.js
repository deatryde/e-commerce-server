const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const morgan = require("morgan");
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(morgan("dev"));
//connect to mongoDB
connectDB();

//defining routes and API
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/userApi"));
app.use("/api/products", require("./routes/productsApi"));
app.use("/api/auth", require("./routes/authApi"));
app.use("/api/profile", require("./routes/profileApi"));
app.use("/api/cart", require("./routes/cartApi"));

app.get("/", (req, res) => {
  res.send("Application is running");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
