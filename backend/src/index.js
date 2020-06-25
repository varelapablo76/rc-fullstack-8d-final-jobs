const express = require("express");

require("dotenv").config();
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const port = 3001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

require("./database");

const statusRouter = require("./routes/statusRouter");

const adminRouter = require("./routes/adminRouter");
const candidateRouter = require("./routes/candidateRouter");
const postulateRouter = require("./routes/postulateRouter");
const offerRouter = require("./routes/offerRouter");

app.use("/api/v1/status", statusRouter);

app.use("/api/v1/users/administrators", adminRouter);
app.use("/api/v1/users/candidates", candidateRouter);
app.use("/api/v1/offer/postulates", postulateRouter);
app.use("/api/v1/offers", offerRouter);

app.use(function (req, res, next) {
  res.status(404).json({ message: "Sorry can't find that!" });
});

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);