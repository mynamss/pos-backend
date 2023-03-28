const express = require("express");
const app = express();
const allRoutes = require("./routes");
const PORT = process.env.PORT || 3000;
const ejs = require("ejs");
const bodyParser = require("body-parser");

// middleware
app.use(express.json());
app.use(allRoutes);

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ejs templating
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
