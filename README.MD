# Store API

This API will give you the details of products available in the Stores.
Database - MongoDB Atlas
Server - NodeJS

#### Local setup

1.clone the repository from github in your local system.
2.run npm install
3.create a .env file in the root and create 2 varibles MONGO_URI & PORT and set the details.
4.to start the app run one of the command (npm run dev) or (npm start)

#### How to access the API

Relative path : /api/v1/products

Some queries :

?featured=true            

?company=ikea             (filter by company name)
 
?name=ae             (search by name string)

?numericFilters=price>30,rating>=4    (price and rating)(>,>=,=,<,<=)

?sort=name,price       

?fields=name,price        (filter fields)

?limit=10&page=2        (by page)


