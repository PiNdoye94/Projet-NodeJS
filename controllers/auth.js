const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res)=>{
    console.log(req.body);

    const nom = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    //const { nom, email, password } = req.body;

    // db.query('SELECT email FROM users WHERE email=?', [email], (error, results)=>{
    //     if(error){
    //         console.log(error);
    //     }
    //     else{
            
    //     }
    //     }
    // });
    
    db.query('INSERT INTO users SET ?', {nom:nom, email:email, password:password}, ()=>{
        if(error){
            console.log(error);
        }
        else{
            console.log(results);
            return res.render('register', {
                message: "utilisateur enregistré"
            });
        }
    });
    res.send("formulaire envoyé");
}