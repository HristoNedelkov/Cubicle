const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        minLenght: 5,
        validate: {
            validator: (v) => {
                return /^[A-z0-9]+$/.test(v)
            },
            message: (props) => {
                return 'Username should consist only english letters and numbers!'
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLenght: 8,
        validate: {
            validator: (v) => {
                return /^[A-z0-9]+$/.test(v)
            }
        },
        message: () => {
            return 'Password should consist only english letters!'
        }
    }
});

module.exports = mongoose.model('User', userSchema);