/*********************************************************************************
* BTI325 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: __Sandeep Digpal____ Student ID: __126454214_____ Date: ____01-10-2022_____
*
* Online (Cyclic) URL:
* ___________https://zany-red-ray-coat.cyclic.app
*
********************************************************************************/
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var multer = require("multer");
var fs = require('fs');
var path = require('path');
var dataservice = require(__dirname + "/data-service.js");
onHttpStart = ()=>{
    console.log('Express http server listening on port ' + HTTP_PORT);
}

var storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
        }
})

var upload = multer({ storage: storage});

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get('/home', (req, res)=>{
    res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/employees", (req, res)=>{
    dataservice.getAllEmployees().then((data) =>{
        res.json({data});
    }).catch((err)=>{
        res.json({message: err});
    })
});

app.get("/managers", (req, res)=>{
    dataservice.getManagers().then((data) =>{
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get("/departments", (req, res)=>{
    dataservice.getDepartments().then((data)=>{
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get('/employees/add', (req, res)=>{
    res.sendFile(path.join(__dirname + "/views/addEmployee.html"));
});

app.get('/images/add', (req, res)=>{
    res.sendFile(path.join(__dirname + "/views/addImage.html"));
});

app.post("/images/add", upload.single("imageFile"), (req,res) => {
    res.send("/images");
});

app.get("/images", (req,res) => {
    fs.readdir("./public/images/uploaded", function(err,items) {
        res.json(items);
    })
});

app.use((req, res)=>{
    res.status(404).end('404 PAGE NOT FOUND');
});

dataservice.initialize().then(() => {
    app.listen(HTTP_PORT, onHttpStart());
}).catch (() => {
    console.log('promises not stisfied');
});