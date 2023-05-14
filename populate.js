require("dotenv").config();

const connectDB = require("./db/connect")
const Product = require("./models/product")

const productsData = require("./products.json")

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(productsData);
        console.log("Success!!!!");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

start();