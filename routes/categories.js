const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");

//CREATE
router.post("/", async (req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET ALL
router.get("/", async (req, res) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats);

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;