const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    todo: String,
},{
    timestamps: true
});


module.exports = mongoose.model('Todo', TodoSchema);
