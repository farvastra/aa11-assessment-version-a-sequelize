const express = require("express");
const router = express.Router();
const { Ingredient } = require("../db/models"); 


router.get("/", async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const { name, measurement } = req.body; 
  try {
    const newIngredient = await Ingredient.create({ name, measurement });
    res.status(201).json(newIngredient);
  } catch (error) {
    console.error("Error creating ingredient:", error);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
