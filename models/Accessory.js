const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema ({
    name: String,
    imageUrl: String,
    description: String,

})

module.exports = mongoose.model('accessories', accessorySchema)