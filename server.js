const express = require("express");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8080;

//connect to mongoDB
connectDB();

//defining routes and API
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/userApi"));
app.use("/api/products", require("./routes/productsApi"));

app.get("/", (req, res) => {
  res.send("Application is running");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
