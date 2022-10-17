const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const path = require("path");

const port = process.env.PORT || 8001;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/goals", require("./api/goals.route"));
app.use("/api/user", require("./api/user.route"));

//Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production mode"));
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
