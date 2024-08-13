const mongoose = require('mongoose')

// Kết nối tới MongoDB
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://0.0.0.0:27017/myskin_website")
  .then(() => console.log('Connected Success!'))
  .catch((err) => console.log(err));

module.exports = mongoose