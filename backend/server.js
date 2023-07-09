const bodyParser = require('body-parser');
const express= require("express");
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

// Parse JSON request bodies
app.use(bodyParser.json());

app.get("/",(req,res)=>{
res.send("app is working")
});

//users
const userRoute = require('./routes/users')
app.use('/api/user',userRoute)



const port = 5002
app.listen(port,console.log(`Listening on port ${port}...`));
