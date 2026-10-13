const mongoose=require('mongoose');


//userschema yeh btaega ki user ka data kaisa hoga it is very crucial in mongoose because it defines the structure of the documents in a collection. It specifies the fields, their data types, and any validation rules or constraints that should be applied to the data. By defining a schema, you can ensure that the data stored in the database adheres to a specific format and meets certain requirements. This helps maintain data integrity and consistency within the application. 
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin','artist'], //enum is used to define a set of allowed values for the role field. In this case, the role can only be either 'user' or 'admin'.
        default:'user'
    }
});

//hmne user model create kiya jisme hmne userSchema ko pass kiya taki mongoose ko pata chale ki user ka data kaisa hoga aur uske according hi data ko store karega database me.
//usermodel iss vjh se create krte hai jisse hum database me user ke data ko easily access kr ske aur uske sath operations perform kr ske jaise ki create, read, update, delete (CRUD) operations.
const userModel=mongoose.model('User',userSchema);

module.exports=userModel;