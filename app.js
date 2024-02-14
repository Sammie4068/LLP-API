const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/index");


// Specify allowed origins
const allowedOrigins = ['http://127.0.0.1:5501', 'http://localhost:3000', 'https://llp-status.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is in the allowedOrigins array
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (e.g., cookies, authorization headers)
};

app.use(cors(corsOptions));

app.use(express.json());
// app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", router);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "e dey work!!!" });
});

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

app.listen(port, () => {
  console.log("server don dey run...");
});
