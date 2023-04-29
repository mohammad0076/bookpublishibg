const mongoose = require('mongoose');
const booklistSchema = mongoose.Schema({
    name: { type: String, require: true },
    publisher_name: { type: String },
    publisher_age: { type: Number },
    page_num: { type: Number },
    Publish_date: { type: Date, default: Date.now },
    type: ['si-fi', 'drama', 'novel']


})
module.exports = booklistSchema;