//importig dependencies
const express=require("express");
const mongoose=require("mongoose");
const router=require("./Routes/UserRoutes");

const app=express();
const cors=require("cors");
//middleware
/*app.use("/",(req,res,next)=>{
    res.send("It is working");
})*/
app.use(express.json());
app.use(cors());
app.use("/users",router);
app.use("/files",express.static("files"));

mongoose.connect("mongodb+srv://admin:Hq4qpqrevI5qfWih@atlascluster.d1qd0xc.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster")
.then(()=>console.log("connected to mongodb"))
.then(()=> {
    app.listen(5000);
})
//After successfully connecting to the database, it starts listening for incoming HTTP requests on port 5000. It seems that app is an Express.js application instance.
.catch((err)=> console.log((err)))
//If there is an error during the connection process, it catches the error and logs it to the console.



//call register model
//import the register model class
require("./Model/Register");
//using mongoose reqire the database 
const User=mongoose.model("Register");
//inserting details usin post method /regiter url should be equal to same as in the Register.js frontend
app.post("/register",async(req,res)=>{
    const {name,gmail,password}=req.body;
    try{
        await User.create({
            name,
            gmail,
            password,
        });
        res.send({status:"ok"});
    }catch(err){
        res.send({status:"err"});
    }

})
//Hq4qpqrevI5qfWih

//login----
app.post("/login",async(req,res)=>{
    const {gmail,password}=req.body;

    try{
        //finding a user by the gmail
        const user=await User.findOne({gmail});
        if(!user){
            return res.json({err:"User Not Found"})

        }
        if(user.password ===password){
            return res.json({status:"ok"});
        }else{
            return res.json({err:"Incorrect password"});
        }
    }
    //server error
    catch(err){
        console.error(err);
        res.status(500).json({err:"server Err"})
    }
});

//pdf -------------
const multer=require("multer");
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./files");
    },
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now();
        cb(null,uniqueSuffix+file.originalname);
    },
});

//Insert PDF model part
require("./Model/Pdfmodel");
const pdfSchema=mongoose.model("pdfDetails");
const uplode=multer({storage});

app.post("/uploadfile",uplode.single("file"),async(req,res)=>{
    console.log(req.file);
    const title=req.body.title;
    const pdf=req.file.filename;

    try{
        await pdfSchema.create({title:title,pdf:pdf});
        console.log("Pdf Uploaded successfully");
        res.send({status:200});

    }catch(err){
        console.log(err);
        res.status(500).send({status:"error"});
    }
});

//next video
app.get('/getFile',async(req,res)=>{
    try{
        const data=await pdfSchema.find({});
        res.send({status:200,data:data});
    }catch(err){
        console.log(err);
        res.status(500).send({status:"error"});
    }
})

