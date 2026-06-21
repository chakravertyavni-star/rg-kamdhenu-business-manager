require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB =
  require("./config/db");

 

const app = express();

/* DATABASE */
 
connectDB();
createAdmin();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/auth")
);

app.use(
  "/api/revenue",
  require("./routes/revenue")
);

app.use(
  "/api/expense",
  require("./routes/expense")
);

/* TEST ROUTE */

app.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    message:
      "RG Kamdhenu Backend Running",
  });

});

/* PORT */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server Running On Port ${PORT}`
  );

});