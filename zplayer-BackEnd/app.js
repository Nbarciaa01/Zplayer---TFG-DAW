const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const routingMain = require("./routes/main.routes");





app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:4200'],
    credentials: true,
    optionsSuccessStatus: 204
}));

routingMain(app)

