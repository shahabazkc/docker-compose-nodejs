const mongoose = require('mongoose');
const dbConnect = async (url) =>{
    return await mongoose.connect(url)
}

module.exports = {
    dbConnect
};