const mongoose=require("mongoose");

const userSchema=mongoose.Schema(
    {
        name:String,
        username:String,
        email:String,
        phone:String,
        password:String
    },
    {
        versionKey:false
    }
)

const userModel=mongoose.model("user",userSchema);

module.exports={userModel}

