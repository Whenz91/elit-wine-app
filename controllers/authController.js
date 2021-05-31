const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validate");

module.exports.register = async (req, res) => {
    // Validate data
    registerValidation(req.body);
    
    try {
        let user = new User(req.body);

        // Check email is exist
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) throw new Error('Email is already exist!');

        // Hash password
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        user.password = hash;

        // Save the new user
        const savedUser = await user.save();
        res.status(201).send(`Successfully created the new user with the following email ${savedUser.email}.`);
    } catch(error) {
        console.log(error);
        res.status(400).send(`Opss! We have some error: ${error}`);
    }
}

module.exports.login = async (req, res) => {
    //Validate data
    loginValidation(req.body);

    try {
        // Check email is exist
        const user = await User.findOne({email: req.body.email});
        if(!user) throw new Error('Email or password is incorrect!');

        //Check password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) throw new Error('Email or password is incorrect!');

        // Make token
        const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);

        // Send back token
        res.header("auth-token", token).send(token);
    } catch(error) {
        console.log(error);
        res.status(400).send(`Opss! We have some error: ${error}`);
    }
}