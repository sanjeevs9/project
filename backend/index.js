const express = require("express");
const cors = require("cors");
const app = express();
const mainRouter = require("./routes/index");

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api", mainRouter);
