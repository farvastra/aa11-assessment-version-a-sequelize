const express = require("express");
const router = express.Router();
const { Entree, EntreeType, Ingredient } = require("../db/models");

router.get("/", async (req, res) => {
  try {
    const entrees = await Entree.findAll({
      include: [
        {
          model: EntreeType,
          as: "EntreeType",
          attributes: ["id", "type"],
        },
        {
          model: Ingredient,
          as: "Ingredients",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });
    res.json(entrees);
  } catch (error) {
    console.error("Error fetching entrees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.post("/entreeTypes/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const { name, description, price } = req.body;
    console.log("Type parameter:", type);
    const entreeType = await EntreeType.findOne({ where: { type } });
    console.log("EntreeType found:", entreeType); // Log the result
    if (!entreeType) {
      return res.status(404).send({ error: "EntreeType not found" });
    }

    const newEntree = await Entree.create({
      name,
      description,
      price,
      entreeTypeId: entreeType.id,
    });

    res.status(200).json(newEntree);
  } catch (error) {
    console.error("Error creating entree:", error);
    res.status(500).send({ error: "Failed to create entree" });
  }
});

router.get("/recipes", async (req, res) => {
  try {
    const entrees = await Entree.findAll({
      include: [
        {
          model: Ingredient,
          as: "ingredients",
          attributes: ["id", "name", "measurement"],
          through: { attributes: [] },
        },
      ],
    });

    res.json(entrees);
  } catch (error) {
    console.error("Error fetching entrees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
