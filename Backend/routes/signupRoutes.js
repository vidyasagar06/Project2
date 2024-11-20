const express = require('express')
const { registerUser, loginUser } = require('../controller/signupCtrl')

const signupRouter= express.Router()

// route for user registration
signupRouter.post('/',registerUser)
signupRouter.post('/login',loginUser)

module.exports=signupRouter;