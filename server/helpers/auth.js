const bcrypt = require('bcrypt');

// Function to hash password
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        throw new Error('Error hashing password');
    }
};

// Function to compare password
const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (error) {
        console.log(error);
        throw new Error('Error comparing passwords');
    }
};

module.exports = {
    hashPassword,
    comparePassword
};
