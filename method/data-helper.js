const db=require('../knexfile-config');

function register(user){
   return  db('user').insert(user);
}

function findBy(user){
    return db('user').where({username: user.username}).first();
}

function getUser(){
    return db('user');
}

module.exports={
    register,
    findBy,
    getUser
}