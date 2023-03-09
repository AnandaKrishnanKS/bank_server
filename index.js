//import dataservise file
const dataservise = require("./service/dataservice")

//import cors
const cors = require("cors")

//import json web token
const jwt = require('jsonwebtoken')

//import express

const express = require("express")

//create app using express
const app = express()

//connection string to frontend integration
app.use(cors({origin:'http://localhost:4200'}))

//to parse json data from req body
app.use(express.json())

//middleware
const jwtMiddleware = (req, res, next) => {

    try {
        const token = req.headers['access_token']  //.body.token

        //verfy token
        const data = jwt.verify(token, "superkey123")

        console.log(data);

        next()
    } catch {
        res.status(422).json({
            statusCode:422,
            status:false,
            message:'plese try login again'
        })
    }
}

//register  -post
app.post('/register', (req, res) => {

    dataservise.register(req.body.uname, req.body.acno, req.body.psw).then(result=>{

        //convert object to json and send as response
    res.status(result.statusCode).json(result)

    })

    
    // console.log(req.body);
    // res.send('success')
})


//login  -get

app.get('/login', (req, res) => {

    dataservise.login(req.body.acno, req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })

   

})

//deposit  -post
app.post('/deposit', jwtMiddleware, (req, res) => {

    dataservise.deposit(req.body.acnum, req.body.password, req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)
    })

   

})
//withdraw -post
app.post('/withdraw', jwtMiddleware, (req, res) => {

    dataservise.withdraw(req.body.acnum, req.body.password, req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)
    })

    

})


//getTransaction
app.get('/transaction', jwtMiddleware, (req, res) => {

    dataservise.getTransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })

   

})

//delete


//create port 

app.listen(3000, () => { console.log("server started at port number 3000"); })