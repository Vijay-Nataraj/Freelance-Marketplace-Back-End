const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRouter");
const serviceRouter = require("./routes/serviceRoutes");
const jobRouter = require("./routes/jobRoutes");
const proposalRouter = require("./routes/proposalRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/proposals", proposalRouter);

module.exports = app;
