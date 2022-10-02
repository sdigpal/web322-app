/*********************************************************************************
* BTI325 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: __Sandeep Digpal____ Student ID: __126454214_____ Date: ____01-10-2022_____
*
* Online (Cyclic) URL:
* ___________https://zany-red-ray-coat.cyclic.app_______________
*
********************************************************************************/
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require('path');
var dataservice = require(__dirname + "/data-service.js");
onHttpStart = ()=>{
    console.log('Express http server listening on port ' + HTTP_PORT);
}
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

app.use((req, res)=>{
    res.status(404).end('404 PAGE NOT FOUND');
});

dataservice.initialize().then(() => {
    app.listen(HTTP_PORT, onHttpStart());
}).catch (() => {
    console.log('promises not stisfied');
});