//iss file me humne music ke liye routes define kiye hai jisse hum music ke related operations perform kr ske jaise ki get, post, put, delete etc.
const multer=require('multer');

const express=require('express');
const authmiddleware=require('../middlewares/auth.middleware'); //hmne auth middleware ko import kiya taki hum usme defined functions ko use kr ske aur unhe routes me map kr ske.

const router=express.Router(); //hmne express.Router() ka use kiya taki hum alag alag routes ko define kr ske aur unhe easily manage kr ske. Router ek middleware hai jo ki request ko handle krta hai aur response bhejta hai.
const musicController=require('../controller/music.controller'); //hmne music controller ko import kiya taki hum usme defined functions ko use kr ske aur unhe routes me map kr ske.


const upload = multer({ storage: multer.memoryStorage() }); //hmne multer ka use kiya taki hum file upload kr ske aur usse memory me store kr ske. memoryStorage() ka use kiya taki file ko memory me store kiya ja ske aur usse easily access kiya ja ske.

//hmne yha pr /album route define kiya hai jisme humne musicController.createMusic function ko map kiya hai taki jab bhi /create route pr request aayegi to createMusic function execute hoga aur music create hoga.
router.post('/upload', authmiddleware.authartist, upload.single('music'), musicController.createMusic);
router.post('/album', authmiddleware.authartist, musicController.createAlbum);

router.get('/', authmiddleware.authuser, musicController.getAllMusic); //yeh route getAllMusic function ko map kar raha hai taki jab bhi / route pr request aayegi to getAllMusic function execute hoga aur saare music ka data return hoga.
router.get('/albums', authmiddleware.authuser, musicController.getAllAlbums); //yeh route getAllAlbums function ko map kar raha hai taki jab bhi /albums route pr request aayegi to getAllAlbums function execute hoga aur saare albums ka data return hoga.

router.get('/albums/:id', authmiddleware.authuser, musicController.getAlbumbyid); //yeh route getAlbumsid function ko map kar raha hai taki jab bhi /albums/:id route pr request aayegi to getAlbumsid function execute hoga aur us particular album ka data return hoga.
module.exports=router;
