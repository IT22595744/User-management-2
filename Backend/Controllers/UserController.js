const User=require("../Model/UserModel");

//displaying all users
const getAllUsers=async(req,res,next)=>
{
    let Users

    //get all users
    try{
        Users=await User.find();//finding every user and displaying
          
    } catch(err){
        console.log(err);
    }

    //not found
    if(!Users){
        return res.Status(404).json({message:"user not found"});

    }

    //Display all users
    return res.status(200).json({Users});
};
//http://localhost:5000/users=>testing above get method using this url in the postman

//inserting users
const addUsers=async(req,res,next)=>{
    const {name,gmail,age,address}=req.body;

    let users;

    try{
        users=new User({name,gmail,age,address});
        await users.save();//save the inserted details in the database
    }catch(err){
        console.log(err);
    }
    //not insert users
    if(!users){
        return res.status(404).json({message:"unable to add user"});
    }
    return res.status(200).json({users});
}
//http://localhost:5000/users=>testing above post method using this url in the postman


//get by ID
const getById=async(req,res,next)=>{
    const id=req.params.id;//finding the particular user

    let user;

    try{
        user=await User.findById(id);
    }catch(err){
        console.log(err);
    }
    //not available users
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({user});

}
//http://localhost:5000/users/id=>testing above get method using this url in the postman

//update user details
const updateUser=async(req,res,next)=>{
    const id=req.params.id;
    const {name,gmail,age,address}=req.body;

    let users;

    try{
        users=await User.findByIdAndUpdate(id,{name:name,gmail:gmail,age:age,address:address});//finding the particular user and updating
        users=await users.save();//save the particular updated details
    }catch(err){
        console.log(err);
    }

    //not available users
    if(!users){
        return res.status(404).json({message:"unable to update user details"});
    }
    return res.status(200).json({users});

}

//delete user details
const deleteUser=async(req,res,next)=>{
    const id=req.params.id;

    let user;

    try{
        user=await User.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message:"unable to update user details"});
    }
    return res.status(200).json({user});
}

//exporting the functions
exports.getAllUsers=getAllUsers;
exports.addUsers=addUsers;
exports.getById=getById;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;