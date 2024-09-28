const express = require("express");
const router = express.Router();
const { Entree } = require("../db/models");


router.get("/", async (req, res) => {
  try {
    const entrees = await Entree.findAll({
      order: [
        ["price", "DESC"],
        ["name", "ASC"],
      ],
    });
    res.json(entrees);
  } catch (error) {
    console.error("Failed to fetch entrees:", error);
    res.status(500).send({ error: "Failed to fetch entrees." });
  }
});

module.exports = router;
