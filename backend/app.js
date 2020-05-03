const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json({ extended: true }));

app.use(cors());

mongoose.set("useFindAndModify", false);

app.use("/api", require("./routes/auth.routes"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}.......... `)
    );
  } catch (e) {
    process.exit(1);
  }
}

start();
