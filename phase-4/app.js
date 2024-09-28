require("express-async-errors");
require("dotenv").config();
const express = require("express");
const { Entree, EntreeType } = require("./db/models");

const app = express();

app.use(express.json());

app.use("/entrees", require("./routes/entrees"));
app.use("/entreeTypes", require("./routes/entreeTypes"));
app.use("/ingredients", require("./routes/ingredients"));


app.get("/entrees/recipes", async (req, res) => {
  try {
    const entrees = await Entree.findAll({
      include: { model: Ingredient, as: "Ingredients" },
    });
    res.status(200).json(entrees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

if (require.main === module) {
  const port = 8005;
  app.listen(port, async () => {
    console.log("Server for Associations is listening on port", port);
    console.log(process.env.DB_FILE);
    const seedDBFile = require("../test-utils/test-utils").seedDBFile;

    await seedDBFile("20220331154733-entrees.js");

   
  });
} else {
  module.exports = app;
}
