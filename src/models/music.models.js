const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    musicUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId, // yha pr hmne artist ka reference diya hai taki hme pata chale ki ye music kis artist ka hai aur hme artist ka data bhi access krne me help milegi.
        required: true,
        ref: "User",
    }  
})

//hmne music model create kiya jisme hmne musicSchema ko pass kiya taki mongoose ko pata chale ki music ka data kaisa hoga aur uske according hi data ko store karega database me.
const musicModel = mongoose.model("Music", musicSchema);
module.exports = musicModel;