const express = require("express");
const bodyParser = require("body-parser");
const StudentRouter = require("./routes/StudentRouter");
const morgan = require("morgan");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use("/api/students", StudentRouter);

module.exports = app;
