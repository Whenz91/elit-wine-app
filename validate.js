const Joi = require("joi");

module.exports.registerValidation = async (data) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()
    }
    
    try {
        const value = await schema.validateAsync(data);
        return value;
    }
    catch (err) {
        return err;
    }
}

module.exports.loginValidation = async (data) => {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
    
    try {
        const value = await schema.validateAsync(data);
        return value;
    }
    catch (err) {
        return err;
    }
}
module.exports.inputDataValidation = async (data) => {
    const schema = {
        name: Joi.string().alphanum().trim().required(),
        price: Joi.number().required(),
        varietyOfWine: Joi.string().trim(),
        typeOfWine: Joi.string().trim(),
        size: Joi.number(),
        alcoholVolume: Joi.number(),
        vintage: Joi.number(),
        origin: {
            country:  Joi.string().alphanum().trim(),
            region: Joi.string().alphanum().trim()
        },
        longDescription: Joi.string().trim(),
        notes: {
            color: Joi.string().trim(),
            taste: Joi.string().trim(),
            composition: Joi.string().trim(),
            recommenFood: Joi.string().trim()
        }
    }
    
    try {
        const value = await schema.validateAsync(data);
        return value;
    }
    catch (err) {
        return err;
    }
}