const {User} = require ("../models/user.js");


 async function checkLogin(req,res){
    const {mail, pass} = req.body
    try {
        const check= await User.findOne({email:mail,password:pass})
        if(check){
           return res.json({status:"success",check})
        }
        else{
           return res.json({status:"failed"})
        }
    } catch (error) {
       console.log(error).msg("unable to login"); 
    }
}

async function signup(req,res){
    const {mail, handle, pass, name}= req.body
    const newUser = new User({handle:handle,name:name,email:mail,password:pass})
    console.log(newUser);
    try {
        const check = await User.findOne({email:mail})
        if(check){
            res.send("exists");
            console.log("already exists");
        }
        else{
            res.send("success")
            await User.insertMany([newUser])
        }
    } catch (error) {
        console.log(error).msg("Registration failed");
    }
}

module.exports ={checkLogin, signup}