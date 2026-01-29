const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const errorHandler = require("./middleware/error");

dotenv.config(); //load .env variables into process.env

const app = express();

app.use(helmet()); //security middleware headers
app.use(morgan("dev")); //logs http requests in the terminal
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: false,
  }),
);
app.use(express.json({ limit: "10kb" }));

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/messages", require("./routes/messages.routes"));
app.use("/api/profile", require("./routes/profile.routes"));

app.use(errorHandler);

const port = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`API listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
