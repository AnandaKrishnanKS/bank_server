//import dataservise file
const dataservise = require("./service/dataservice")

//import json web token
const jwt = require('jsonwebtoken')

//import express

const express = require("express")

//create app using express
const app = express()

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

    const result = dataservise.register(req.body.uname, req.body.acno, req.body.psw)

    //convert object to json and send as response
    res.status(result.statusCode).json(result)
    // console.log(req.body);
    // res.send('success')
})


//login  -get

app.get('/login', (req, res) => {

    const result = dataservise.login(req.body.acno, req.body.psw)

    res.status(result.statusCode).json(result)

})

//deposit  -post
app.post('/deposit', jwtMiddleware, (req, res) => {

    const result = dataservise.deposit(req.body.acnum, req.body.password, req.body.amount)

    res.status(result.statusCode).json(result)

})
//withdraw -post
app.post('/withdraw', jwtMiddleware, (req, res) => {

    const result = dataservise.withdraw(req.body.acnum, req.body.password, req.body.amount)

    res.status(result.statusCode).json(result)

})


//getTransaction
app.get('/transaction', jwtMiddleware, (req, res) => {

    const result = dataservise.getTransaction(req.body.acno)

    res.status(result.statusCode).json(result)

})

//delete


//create port 

app.listen(3000, () => { console.log("server started at port number 3000"); })