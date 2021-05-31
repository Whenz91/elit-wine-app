const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const wineRoutes = require("./routes/wines.js");
const userRoutes = require("./routes/auth.js");

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`Connected to Mongo!`);
    }).catch(error => {
        console.error("Error connecting to mongo", error);
    });

const app = express();
const PORT = process.env.PORT || 5000;;

app.use(express.json());

app.use("/wines", wineRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});