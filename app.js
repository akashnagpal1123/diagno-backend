const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const storyRoutes = require("./routes/storyRoutes");
app.use("/api", storyRoutes);

module.exports = app; 