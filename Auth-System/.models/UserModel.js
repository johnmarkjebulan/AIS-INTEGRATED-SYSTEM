import pool from './db.js';
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export const getUser = async (id) => {
   if(parseInt(id)==NaN){
      throw new Error('Invalid id');
   }

   const [user] = await pool.query('SELECT * FROM tbluser where id = ?',
   [id]
   );
   return user;   
}

//register function
export const createUser = async (userProfile, email, password) => {
    if (email == ""){
        throw new Error('Invalid Email');
    } 
    
    if (!validator.isEmail(email)){
        throw new Error('Invalid Email')
    }

    const [user] = await pool.query('SELECT * FROM tbluser where email = ?',
    [email]
    )

   
    

    if(user.length === 1){
        throw new Error('An account is already created with that email')
     }

     if (password == ""){
        throw new Error('Invalid Password')
     }

     if(!validator.isStrongPassword(password)){
        throw new Error('Password too weak')
     }

     const salt = bcrypt.genSaltSync(10);
     const newPassword = bcrypt.hashSync(password, salt);

     //changes to be made to the userProfile object to match the expected format of the API
     const response = await fetch(
      'https://ais-simulated-legacy.onrender.com/api/students', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(userProfile)
      });

     const [newUser] = await pool.query (
        'Insert into tbluser (email, password) values (?,?)',
        [email, newPassword]
     )

     return newUser.insertId;
}

//login function
export const login = async (email, password) => {
   if (email == "" || password == ""){
      throw new Error('Email and Password are required');
   }
   const [user] = await pool.query('SELECT * FROM user where email = ?',
   [email]
   );

   if(user.length === 0){
      throw new Error(`An account with an email:${email} does not exist`);
   }
   
   if(!bcrypt.compareSync(password, user[0].password)){
      throw new Error('Incorrect Password');
   }

   //generate Token
   const token = jwt.sign({id: user[0].id },process.env.SECRET,{
      expiresIn: '1d'
   });

   return token;
  
}