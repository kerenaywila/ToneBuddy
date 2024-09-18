const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const workoutRouter = require("./routes/workoutRoutes");
const nutritionRouter = require("./routes/nutritionRoutes");

app = express();

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => console.log("MONGODB CONNECTED!"));

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

app.use("/api", authRouter);

app.use("/api", workoutRouter);

app.use("/api", nutritionRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Welcome to the server, this endpoint does not exist yet!",
  });
});
