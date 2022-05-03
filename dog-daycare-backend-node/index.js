var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);
var db = new sqlite3.Database('../database/dog-daycare.db');

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));


// db.run('CREATE TABLE IF NOT EXISTS Owner( id INTEGER PRIMARY KEY AUTOINCREMENT, last_name TEXT, first_name TEXT, email TEXT )');
// db.run('CREATE TABLE IF NOT EXISTS Pet( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, breed TEXT, gender TEXT, ownerId INTEGER REFERENCES Owner(id) )');

// db.run("INSERT INTO `Owner` (last_name, first_name, email) values( 'smith', 'jack', 'jack.smith@gmail.com' )");
// db.run("INSERT INTO `Owner` (last_name, first_name, email) values( 'black', 'jane', 'janelovesdogs@gmail.com' )");
// db.run("INSERT INTO `Owner` (last_name, first_name, email) values( 'white', 'mike', 'mikestools@gmail.com' )");

// db.run("INSERT INTO `Pet`( name, breed, gender, ownerId ) values( 'Rover', 'German Sheperd', 'male', 1 )");
// db.run("INSERT INTO `Pet`( name, breed, gender, ownerId ) values( 'Prissy', 'Miniture Poodle', 'female', 2 )");
// db.run("INSERT INTO `Pet`( name, breed, gender, ownerId ) values( 'Missy', 'Yorkie', 'female', 2 )");
// db.run("INSERT INTO `Pet`( name, breed, gender, ownerId ) values( 'Sissy', 'Chi-Poo', 'female', 2 )");
// db.run("INSERT INTO `Pet`( name, breed, gender, ownerId ) values( 'Ditsy', 'Maltese', 'female', 2 )");
// db.run("INSERT INTO `Pet`( name, breed, gender, ownerId ) values( 'Max', 'Miniture Schnauzer', 'male', 2 )");
// db.run("INSERT INTO `Pet`( name, breed, gender, ownerId ) values( 'Junior', 'Golden Doodle', 'male', 3 )");
// db.run("INSERT INTO `Pet`( name, breed, gender, ownerId ) values( 'Boomer', 'Bernedoodle', 'male', 3 )");


app.get('/', function(req,res){
    res.send("<h3> Hi there, You are going to perform CRUD operations.............[CREATE] Please enter 'http://localhost:3000/add/(id number)/(name)' to add new employee to the database.........................[READ] 'http://localhost:3000/view/(id number)' to view an employee.........................[UPDATE] 'http://localhost:3000/update/(id number)/(new name)' to update an employee.....................[DELETE] 'http://localhost:3000/del/(id number)' to delete an employee...............................Before closing this window, kindly enter 'http://localhost:3000/close' to close the database connection <h3>");
});

app.get('/getAllOwners', function(req,res){
    db.all(`select * from Owner`, (err, rows) => {
        if(err){
            res.send("Error encountered while fetching all the data from the database");
            return console.error(err.message);
        } else {
            res.send(rows);
        }
    });
});

app.get('/getAllPets', function(req,res){
    db.all(`select * from Pet`, (err, rows) => {
        if(err){
            res.send("Error encountered while fetching all the data from the database");
            return console.error(err.message);
        } else {
            res.send(rows);
        }
    });
});

app.get('/getPetsOfOwner/:ownerId', function(req,res){
    db.all(
        `select * 
        from Pet 
        where ownerId=?`, 
        [req.params.ownerId], 
        (err, rows) => {
            if(err){
                res.send("Error encountered while fetching all the data from the database");
                return console.error(err.message);
            } else {
                res.send(rows);
            }
    });
});

app.get('/addOwner/:id/:name', function(req,res){
    db.run('INSERT INTO emp(id,name) VALUES(?,?)', [req.params.id, req.params.name], function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log("New employee has been added");
        res.send("New employee has been added into the database with ID = "+req.params.id+ " and Name = "+req.params.name);
    });
});

server.listen(3001,function(){ 
    console.log("Server listening on port: 3001");
});