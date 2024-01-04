const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    userId: { type: String, required: true },
    code: { type: String, required: true },
});

const fileModel = mongoose.model('File', fileSchema);
module.exports = fileModel;
