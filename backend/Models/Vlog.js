const mongoose = require('mongoose');
const vlogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    file: [
        {
            type: String,
            trim:true
       }
    ] ,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


const Vlog = mongoose.model('Vlog', vlogSchema);
module.exports = Vlog;