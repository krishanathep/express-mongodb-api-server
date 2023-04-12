const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRoute = require("./routes/blogs")
require("dotenv").config()

const app = express()

//connect cloud database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
})
.then(()=>console.log("DATABASE CONNECTED"))
.catch((err)=>console.log(err))

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//route
app.use("/api", blogsRoute)

const port = process.env.PORT || 8080

app.listen(port, ()=>console.log(`Start server in port ${port}`))
