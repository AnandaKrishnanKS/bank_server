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


//login  -get

app.get('/login',(req,res)=>{

    const result=dataservise.login(req.body.acno,req.body.psw)
    
    res.status(result.statusCode).json(result)

    })

//deposit  -post
app.post('/deposit',(req,res)=>{

    const result=dataservise.deposit(req.body.acnum,req.body.password,req.body.amount)

    res.status(result.statusCode).json(result)

})
//withdraw -post
app.post('/withdraw',(req,res)=>{

    const result=dataservise.withdraw(req.body.acnum,req.body.password,req.body.amount)

    res.status(result.statusCode).json(result)

})


//gerTransaction
//delete


//create port 

app.listen(3000,()=>{console.log("server started at port number 3000");} )