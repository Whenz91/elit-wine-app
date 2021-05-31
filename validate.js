const Joi = require("@hapi/joi");

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
        return err
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
        return err
    }
}