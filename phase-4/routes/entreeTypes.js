const express = require("express");
const router = express.Router();
const { EntreeType, Entree } = require("../db/models");

router.get("/", async (req, res) => {
  try {
    const entreeTypes = await EntreeType.findAll({
      include: [{ model: Entree, as: "Entrees" }],
    });
    res.json(entreeTypes);
  } catch (error) {
    console.error("Error fetching entree types:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:type/entrees", async (req, res) => {
  try {
    const { type } = req.params;
    const { name, description, price } = req.body;

    
    const entreeType = await EntreeType.findOne({ where: { type } });
    if (!entreeType) {
      return res.status(404).json({ error: "EntreeType not found" });
    }

   
    const newEntree = await Entree.create({
      name,
      description,
      price,
      entreeTypeId: entreeType.id,
    });

    res.status(201).json(newEntree);
  } catch (error) {
    console.error("Error creating entree:", error);
    res.status(400).json({ error: "Bad request" });
  }
});



router.delete("/:type", async (req, res) => {
  try {
    const { type } = req.params;

    // Find the entree type by type name
    const entreeType = await EntreeType.findOne({ where: { type } });
    if (!entreeType) {
      return res.status(404).json({ error: "EntreeType not found" });
    }

    
    await entreeType.destroy();

    res.status(204).send(); 
  } catch (error) {
    console.error("Error deleting entree type:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
