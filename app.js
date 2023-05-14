require("dotenv").config();
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

const express = require("express");
const app = express();

//middleware
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("<h1>Store API</h1><a href='/api/v1/products'>Products list</a>")
})

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = ()=>{
    try {
        //connectDB
        app.listen(port,console.log(`Server is live on port: ${port}...`));
    } catch (error) {
        console.error(error);
    }
}

start();