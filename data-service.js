const file = require('fs');  
var departments = [];
var employees = [];


exports.initialize = () =>{
    return new Promise ((resolve, reject) =>{
        file.readFile('./data/departments.json', (err,data)=> {
            if (err) {
                reject ('unable to fetch data');
            }
            else {
                departments = JSON.parse(data);
            }
        });
        file.readFile('./data/employees.json', (err,data) =>{
            if (err) {
                reject ('unable to fetch data');
            }
            else {
                employees = JSON.parse(data);
            }
        })       
        resolve();
    })
};

exports.getAllEmployees = () =>{
    return new Promise ((resolve,reject) => {
        if (employees.length == 0) {
            reject('unable to fetch data');
        }
        else {
            resolve(employees);
        }
    })
};

exports.getManagers = () => {
    return new Promise ((resolve, reject) => {
        var managers = employees.filter(employee => employee.isManager == true);
        if (managers.length == 0) {
            reject('unable to fetch data');
        }
        resolve(managers);
    })
};

exports.getDepartments = () => {
    return new Promise((resolve,reject) => {
        if (departments.length == 0) {
            reject ('unable to fetch data');
        }
        else {
            resolve (departments);
        }
    })
};

