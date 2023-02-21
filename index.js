//import dataservise file
const dataservise=require("./service/dataservice")

//import express

const express=require("express")

//create app using express
const app=express()

//to parse json data from req body
app.use(express.json())


//register  -post
app.post('/register',(req,res)=>{

const result=dataservise.register(req.body.uname,req.body.acno,req.body.psw)

//convert object to json and send as response
res.status(result.statusCode).json(result)
// console.log(req.body);
// res.send('success')
})


//login
//deposit
//withdraw
//gerTransaction
//delete


// //request
// app.get('/',(req,res)=>{
//     res.send('Get Method...1')
// })

// app.post('/',(req,res)=>{
//     res.send('Post Method...2')
// })

// app.put('/',(req,res)=>{
//     res.send('Put Method...3')
// })

// app.patch('/',(req,res)=>{
//     res.send('Patch Method...4')
// })

//create port 
app.listen(3000,()=>{console.log("server started at port number 3000");} )