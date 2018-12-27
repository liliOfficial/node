const mongoose = require('mongoose');

module.exports = function() {
    const db = process.env.MONGODB_URI || 'mongodb://localhost/node';
    mongoose.connect(db, { useNewUrlParser: true }).then(() => {
        console.log(`Connect to ${db}...`);
    });
}