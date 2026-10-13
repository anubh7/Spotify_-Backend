require('dotenv').config({ quiet: true }); // quiet:true se dotenv ka "injected env" banner stderr pe nahi aayega, jo PowerShell me NativeCommandError jaisa dikhta hai

const app=require('./src/app');

const connectDB=require('./src/db/db');

connectDB();



app.listen(3000,()=>{
    console.log("server is running sucessfully");
})