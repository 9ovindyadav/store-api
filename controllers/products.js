const Product = require("../models/product")

const getAllProducts = async (req,res)=>{
    const {featured,company,name,sort,fields,numericFilters} = req.query ;
    const newObject = {};
    
    if(featured){
        newObject.featured = featured === "true"? true : false ;
    }
    if(company){
        newObject.company = company ;
    }
    if(name){
        newObject.name = { $regex: name, $options: "i" }
    }
    if(numericFilters){
        const operatorMap = {
            ">":"$gt",
            ">=":"$gte",
            "=":"$eq",
            "<":"$lt",
            "<=":"$lte",
        }
        const regEx = /\b(>|>=|=|<|<=)\b/g ;
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`);
        
        const options = ["price","rating"] ;
        filters = filters.split(",").forEach((item) => {
            const [field,operator,value] = item.split("-") ;
            if(options.includes(field)){
                newObject[field] = { [operator]: Number(value)}
            }
        })
    }
    
        let result = Product.find(newObject);
//sort
    if(sort){
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    }else{
        result = result.sort("createdAt");
    }
    //fields
    if(fields){
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
    }

    const page = req.query.page || 1 ;
    const limit = req.query.limit || 10 ;
    const skip = (page-1)*limit ;

    result = result.skip(skip).limit(limit) ;

        const products = await result;
        return res.status(200).json({products,nHits: products.length})
}

const getAllProductsStatic = async (req,res)=>{

    const products = await Product.find({price:{$gt: 300}}).sort("price").select("name price");

    return res.status(200).json({products,nHits: products.length})
    
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}