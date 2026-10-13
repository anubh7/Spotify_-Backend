const express=require('express');
const cookieParser=require('cookie-parser');
const musicroutes=require('./routes/music.routes'); // Import the music routes
const authroutes=require('./routes/auth.route');


const app=express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authroutes);
app.use('/api/music',musicroutes);


module.exports=app