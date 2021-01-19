const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const { use } = require('./routes/auth');

dotenv.config({ path: './.env'});

app = express();

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "tutonodejs"
// });

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.set('view engine', 'hbs');
const repertoirePublic = path.join(__dirname,'./public');
//console.log(__dirname);
app.use(express.static(repertoirePublic));

db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log('Mysql connected!');
    }
});

// app.get("/", (req,res)=>{
//     //res.send('<h1>Home Page</h1>');
//     res.render("index");
// });

// app.get("/register", (req,res)=>{
//     res.render("register");
// });

//definition de nos routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(4000,()=>{
    console.log('Started on port 4000');
})