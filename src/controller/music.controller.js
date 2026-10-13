const musicModel = require("../models/music.models");
const jwt = require("jsonwebtoken");
const { uploadImage } = require("../services/storage.service");
const albumModel = require("../models/album.model");


async function createMusic(req, res) {

    const { title } = req.body;
    const file = req.file;

    // Check if file is provided
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const result = await uploadImage(file.buffer.toString("base64")); // Convert buffer to base64 string before uploading

    // Check if the upload was successful
    if (!result) {
        return res.status(500).json({ message: "Error uploading image" });
    }

    // Create a new music entry in the database
    const musicData = await musicModel.create({
        title,
        musicUrl: result.url,
        artist: req.user.id // Assuming the artist's ID is stored in the token payload
    });
    return res.status(201).json({ message: "Music created successfully", musicData });

}


async function createAlbum(req, res) {

    const { title, musics } = req.body;
    const albumData = await albumModel.create({
        title,
        artist: req.user.id,
        music: musics // Assuming musics is an array of music IDs
    });
    return res.status(201).json({ message: "Album created successfully", albumData });
}

//pagination me skip and limit ka use boht hota hai 
async function getAllMusic(req, res) {
    const allMusic = await musicModel.find().limit(2).populate("artist"); //hmne populate() function ka use kiya taki hme artist ka data bhi mile jo ki music ke sath associated hai. populate() function ka use karke hme artist ka data bhi milega jo ki music ke sath associated hai.
    return res.status(200).json({ message: "All music fetched successfully", allMusic });
}

async function getAllAlbums(req, res) {
    const allAlbums = await albumModel.find().select("title artist").populate("artist").populate("music"); //hmne populate() function ka use kiya taki hme artist ka data bhi mile jo ki album ke sath associated hai. populate() function ka use karke hme artist ka data bhi milega jo ki album ke sath associated hai.
    return res.status(200).json({ message: "All albums fetched successfully", allAlbums });
}

//yeh function getAlbumbyid() ka use karke hme particular album ka data milta hai jiska id params me aaya hai. findById() function ka use karke hme us particular album ka data milta hai jiska id params me aaya hai. populate() function ka use karke hme artist aur music ka data bhi milta hai jo ki album ke sath associated hai.
async function  getAlbumbyid(req,res){
    const albumId = req.params.id;
    const album = await albumModel.findById(albumId).populate("artist").populate("music"); //findById() se us particular album ka data milta hai jiska id params me aaya hai. populate() se artist aur music ka data bhi aa jata hai.
    if(!album){
        return res.status(404).json({message:"Album not found"});
    }
    return res.status(200).json({message:"Album fetched successfully", album});
}
module.exports = {
    createMusic,
    createAlbum,
    getAllMusic,
    getAllAlbums,
    getAlbumbyid
};