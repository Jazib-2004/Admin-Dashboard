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
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.json(user);
});
// Load the /users routes
//app.use("/users", require("./routes/users.js"));

app.listen(5000);
