const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const secrets=require('./secret');
const restricted=require('./restricted');
const {register,findBy,getUser}=require('../method/data-helper.js');
const Router=express.Router();

Router.post('/register', async (req,res)=>{
    try{
        const user=req.body;
        const hash= bcrypt.hashSync(user.password,4);
        user.password=hash;
        const id=await register(user)
        res.status(201).json(`Successfully register with id of ${id}`)
    }catch(error){
        res.status(500).json(`Internal Server Error`);
    }
})

Router.post('/login', (req,res)=>{
    const user=req.body;
    if(user.username){
        findBy(user)
        .then(person=> {
            console.log(person);
            if(person && bcrypt.compareSync(user.password,person.Password)){
                const token=generateToken(person);
                res.status(200).json({
                    message: `Welcome back ${person.Username}`,
                    token });
            } else{
                res.status(401).json(`You shall not pass`);
            }
         })
        .catch(err=>{
            res.status(500).json({messageError: err})
        } )
    } else{
        res.status(401).json(`Please provide the username`);
    }
})

Router.get('/',restricted, (req,res)=>{
    getUser()
    .then(user=> res.status(200).json(user))
    .catch(err=> res.status(500).json(err))
})

function generateToken(person){
    const payload={
        subject: person.id,
        username: person.username,
        department: person.department
    };
    const options={
        expiresIn: '2h'
    };

    return jwt.sign(payload,secrets.jwtSecret,options);
}

module.exports=Router;