const { userCreateSchema, userUpdateSchema, userLoginSchema } = require("./schema");

function validateUserCreatePayload(payload) {
    const validationResult = userCreateSchema.validate(payload);
    if (validationResult.error) {
        throw new Error(validationResult.error.message);
    }   
}

function validateUserUpdatePayload(payload) {
    const validationResult = userUpdateSchema.validate(payload);
    if (validationResult.error) {
        throw new Error(validationResult.error.message);
    }   
}

function validateUserLoginPayload(payload) {
    const validationResult = userLoginSchema.validate(payload);
    if (validationResult.error) {
        throw new Error(validationResult.error.message);
    }   
}

module.exports = {
    validateUserCreatePayload,
    validateUserUpdatePayload,
    validateUserLoginPayload,
};