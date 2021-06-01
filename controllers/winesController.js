const Wine = require("../models/Wine.js");
const { inputDataValidation } = require("../validate");

// Get all wine
module.exports.getWines = async (req, res) => {
    try {
        const wines = await Wine.find();

        if(!wines) throw new Error("Sorry the winecellar is empty!");

        res.send(wines);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    }

}

// Get one wine 
module.exports.getWine = async (req, res) => {
    try {
        const { id } = req.params;
        const wine = await Wine.findOne({ _id: id });

        if(!wine) throw new Error(`Sorry, we couldn't find any itemes matching the id: ${id}.`);

        res.send(wine);

    } catch(error) {
        console.log(error);
        res.status(404).send(error);
    }
}

// Delete wine
module.exports.deleteWine = async (req, res) => {
    try {
        const { id } = req.params;
        await Wine.deleteOne({ _id: id });
        res.send("Successfully deleted the item");
    } catch(error) {
        return res.status(404).send(`The item could not be deleted because something went wrong ${error}}`);
    }
}

// Create wine
module.exports.createWine = async (req, res) => {
    inputDataValidation(req.body);
    try {
        const wine = new Wine(req.body);
        if(wine.mainImage) {
            wine.mainImage = `${req.protocol}://${req.get('host')}/${req.file.destination}${req.file.filename}`;
        }

        const savedWine = await wine.save();
        res.status(201).send(`Successfully created the new item with the following name ${savedWine.name}.`);
    } catch(error) {
        console.log(error);
        res.status(400).send(`Opss! We have some error: ${error}`);
    }
}

// Update wine
module.exports.updateWine = async (req, res) => {
    inputDataValidation(req.body);
    try {
        const { id } = req.params;
        await Wine.updateOne({ _id: id }, req.body);

        res.send(`Successfully updated the item.`);
    } catch(error) {
        console.log(error);
        res.status(400).send(`Opss! We have some error: ${error}`);
    }
}