const express=require('express');
const cors=require('cors');
const Router=require('./api/Router');

const server=express();
server.use(cors());
server.use(express.json());
server.use('/api',Router);



module.exports=server;