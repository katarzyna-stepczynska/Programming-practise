const mongoose = require('mongoose');
const Schema = mongoose.Schema; //capitalized is extremely important

let todoSchema = new Schema({
    description: String,
    done: Boolean
});
//use the model on Mongoose
module.exports = mongoose.model('Todo', todoSchema);