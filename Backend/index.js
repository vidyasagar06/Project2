// entry point for express
const express=require('express');
const cors=require('cors')
const RunServer = require('./database/connection');
const signupRouter = require('./routes/signupRoutes');



const app=express();
const port=5000;

// json: transmitting the data b/w  client and server
app.use(express.json())
app.use(cors())
// backend port no 3000,frontend  port no 5173
// to connect that we are using cors
// app.use(cors())


RunServer()
// app.use('/user',userRouter)
// app.use('/contact',contactRouter)

app.use('/api/user',signupRouter)
app.listen(port, ()=>{
    console.log(`server is running on ${port} port!`)
})
