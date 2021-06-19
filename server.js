// dependencies------------------------------
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000
const fileUpload = require('express-fileupload')


// database connection ----------------------
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .then(() => console.log("db connected!"))
    .catch(err => console.error("db connection failed ", err))
    // express app setup -----------------------
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('*', cors())
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }
}))


// routes ---------------------------------
/*
/auth/sign-in
(User is issued with an access token and user details are retrieved.)

/auth/validate
(To make sure the user is authorised for profile and booking pages)

/user
(Create account/ View account details / Edit account / Delete account)

/package
(Create packages / Get all packages / Get by Id Packages / Edit packages)
*/

// run app listen on port --------------------
app.listen(port, () => {
    console.log("App running on port ", port)
  })