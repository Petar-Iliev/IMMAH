const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
// const Post = require('./db_schemas/post');
// const User = require('./db_schemas/user');
// const Role = require('./db_schemas/role');

const postRouter = require('./routes/post/postrouter');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use("/post",postRouter);

// app.get("/page",(req,res)=>{
//     console.log("Querys "+req.query.number +" "+req.query.ks );

//     res.send("aha")
// })

// app.get("/blank/:model/:not",(req,res)=>{

//     console.log(req.params);
//     res.send("res");
// })


mongoose.connect('mongodb://localhost:27017/proj_db',{useCreateIndex:true,useUnifiedTopology:true,useNewUrlParser:true})

app.listen(PORT,()=>{
    console.log("Server is listening on port "+PORT);
})