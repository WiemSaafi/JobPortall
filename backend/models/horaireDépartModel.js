const mongoose = require('mongoose');

const heureDépartSchema = new mongoose.Schema({
    
    Heure: {
        type:Date,
    required: [true, ' Heure is required']
    },
    typeHeure: {
        type: String,
        required: [true, ' type heure  is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("HeureDépart", heureDépartSchema);