const express= require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

require("dotenv").config();

const app =express();

const Urlpth= require("./router");

app.use(bodyParser.json());

app.use(cors());

app.use("/", Urlpth);

app.use("/api/user", Urlpth)

app.use("/api/addtenant", Urlpth)

app.use("/api/deleteuser/:phone/", Urlpth)

app.use("/api/edituser/:phone/", Urlpth)

app.use("/api/updateuser/:phone/", Urlpth)

app.use("/api/addsubscription", Urlpth)

app.use("/api/subuser", Urlpth)

app.use("/api/addpayment", Urlpth)

app.use("/api/payments", Urlpth)

app.use("/api/addadmin", Urlpth)

app.use("/api/login", Urlpth)

app.use("/api/getfname", Urlpth)

app.use("/api/addproduct", Urlpth)

app.use("/api/addproductmul", Urlpth)

app.use("/api/addproduct1", Urlpth)

app.use("/api/products", Urlpth)

app.use("/api/deleteproduct/:productid/", Urlpth)

app.use("/upload", Urlpth)

app.use("/api/updateproduct/:productid", Urlpth)

app.use("/api/getorder", Urlpth)

app.use("/api/deleteorder/:orderid", Urlpth)

app.use("/api/orderitem/:orderid", Urlpth)

app.use("/api/getcustomers", Urlpth)

app.use("/api/getReviews", Urlpth)

app.use("/api/adddiscount", Urlpth)

app.use("/api/deletediscount/:id", Urlpth)

app.use("/api/toggleDiscount/:id", Urlpth)

app.use("/api/products_list_mens", Urlpth)

app.use("/api/products_list_womens", Urlpth)

app.use("/api/product_details/:product_id", Urlpth)

app.use("/api/reviews/:product_id", Urlpth)

app.use("/api/search_products", Urlpth)

app.use("/api/find_products", Urlpth)

app.use("/api/add_review", Urlpth)

app.use("/api/verify_otp", Urlpth)

app.use("/api/order/grandTotal", Urlpth)

app.use("/api/usersignup", Urlpth)

app.use("/send-email", Urlpth)

app.use("/api/products/:subcategory", Urlpth)

app.use("/api/productEffects/:productId", Urlpth)

app.use("/api/billing_information", Urlpth)

app.use("/api/filterOptions", Urlpth)

app.use("/api/check_email", Urlpth)

app.use("/api/login", Urlpth)

app.use("/api/check_contact", Urlpth)

app.use("/api/discounts", Urlpth)

const port = process.env.PORT ; // Use the port from environment variables or default to 5000

app.listen(port, () => console.log(`Server running on port ${port}`));

