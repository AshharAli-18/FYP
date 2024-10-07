const session = require("express-session");

const cookieParser = require("cookie-parser");

const express = require("express");

const cors = require("cors");

const multer = require("multer");

const path = require("path");

const bcrypt = require("bcryptjs");

const salt = 10;

const jwt = require("jsonwebtoken");

const Router = express.Router();

const dbconnected = require("./dbconnection");

const bodyParser = require("body-parser");

Router.use(express.json());

Router.use(cookieParser());

Router.use(bodyParser.urlencoded({ extended: true }));




Router.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   //    
}))

Router.use(
   session({
      key: "userid",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
         expires: 60 * 60 * 24,
      },
   })
);


Router.use(express.static('images'));
Router.use(express.static('effects'));


// const dbconnected = require('./db');
const nodemailer = require('nodemailer');




Router.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Incomplete login data' });
  }

  const loginQuery = 'SELECT password, status FROM user WHERE email = ?';

  dbconnected.query(loginQuery, [email], (err, rows) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = rows[0];

    if (user.status !== 'verified') {
      return res.status(401).json({ error: 'User not verified' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error during password comparison:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      res.json({ message: 'Login successful' });
    });
  });
});



Router.get('/api/discounts', (req, res) => {
  const query = 'SELECT * FROM discounts';

  dbconnected.query(query, (err, rows) => {
    if (err) {
      console.error('Error fetching discounts:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
});



Router.post('/api/check_email', (req, res) => {
   const { email } = req.body;
 
   if (!email) {
     return res.status(400).json({ error: 'Incomplete data' });
   }
 
   const checkEmailQuery = 'SELECT COUNT(*) as count FROM user WHERE email = ?';
 
   dbconnected.query(checkEmailQuery, [email], (err, result) => {
     if (err) {
       console.error('Error checking email:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
 
     if (result[0].count > 0) {
       res.json({ exists: true });
     } else {
       res.json({ exists: false });
     }
   });
 });



 Router.post('/api/check_contact', (req, res) => {
   const { contact } = req.body;
 
   if (!contact) {
     return res.status(400).json({ error: 'Incomplete data' });
   }
 
   const checkContactQuery = 'SELECT * FROM user WHERE contact = ?';
 
   dbconnected.query(checkContactQuery, [contact], (err, result) => {
     if (err) {
       console.error('Error checking contact:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
 
     if (result.length > 0) {
       const userInformation = {
         fname: result[0].fname,
         lname: result[0].lname,
         email: result[0].email,
         contact: result[0].contact,
         address: result[0].address,
         city: result[0].city,
       };
 
       res.json({ exists: true, userInformation });
     } else {
       res.json({ exists: false });
     }
   });
 });


//  Router.post('/api/billing_information', (req, res) => {
//    const { firstName, lastName, emailAddress, phone, address, townCity, subtotalvalue, totalAmountvalue, productIds, orderDate } = req.body;
   
 
//    if (!firstName || !lastName || !emailAddress || !phone || !address || !townCity || !productIds || productIds.length === 0) {
//      return res.status(400).json({ error: 'Incomplete billing information or missing products' });
//    }
 
//    const roleid = 3;
//    const insertQuery = 'INSERT INTO user (fname, lname, email, contact, address, city, roleid) VALUES (?, ?, ?, ?, ?, ?, ?)';
 
//    dbconnected.query(insertQuery, [firstName, lastName, emailAddress, phone, address, townCity, roleid], (err, userResult) => {
//      if (err) {
//        console.error('Error storing user information:', err);
//        return res.status(500).json({ error: 'Internal Server Error' });
//      }
 
//      if (userResult.affectedRows !== 1) {
//        console.error('Error storing user information');
//        return res.status(500).json({ error: 'Internal Server Error' });
//      }
 
//      console.log('User information stored successfully');
//      const userid = userResult.insertId;
//      const orderInsertQuery = 'INSERT INTO `order` (userid, subtotal, grandtotal, orderdate) VALUES (?, ?, ?, ?)';
 
//      dbconnected.query(orderInsertQuery, [userid, subtotalvalue, totalAmountvalue, orderDate], (err, orderResult) => {
//        if (err) {
//          console.error('Error storing order information:', err);
//          return res.status(500).json({ error: 'Internal Server Error' });
//        }
 
//        if (orderResult.affectedRows !== 1) {
//          console.error('Error storing order information');
//          return res.status(500).json({ error: 'Internal Server Error' });
//        }
 
//        console.log('Order information stored successfully');
//        const orderid = orderResult.insertId;
 
//        const insertOrderItemsAndUpdateProducts = productIds.map((productId) => {
//          return new Promise((resolve, reject) => {
//            const orderItemInsertQuery = 'INSERT INTO orderitem (orderid, productid) VALUES (?, ?)';
//            dbconnected.query(orderItemInsertQuery, [orderid, productId], (err) => {
//              if (err) {
//                return reject(err);
//              }
//              const updateProductStatusQuery = 'UPDATE products SET status = "out of stock" WHERE productid = ?';
//              dbconnected.query(updateProductStatusQuery, [productId], (err) => {
//                if (err) {
//                  return reject(err);
//                }
//                resolve();
//              });
//            });
//          });
//        });
 
//        Promise.all(insertOrderItemsAndUpdateProducts)
//          .then(() => {
//            const mailOptions = {
//              to: emailAddress,
//              subject: 'Order Confirmation',
//              html: `
//                <p>Thank you for placing your order! Your order# is <strong>${orderid}</strong>.</p>
//              `
//            };
 
//            transporter.sendMail(mailOptions, (error, info) => {
//              if (error) {
//                console.log('Error sending email:', error);
//              } else {
//                console.log('Email sent:', info.response);
//              }
//            });
 
//            console.log('Order and billing information stored successfully');
//            return res.status(200).json({ message: 'Order and billing information stored successfully', orderId: orderid });
//          })
//          .catch((err) => {
//            console.error('Error storing order items or updating product status:', err);
//            return res.status(500).json({ error: 'Internal Server Error' });
//          });
//      });
//    });
//  });



Router.post('/api/billing_information', (req, res) => {
  const { firstName, lastName, emailAddress, phone, address, townCity, subtotalvalue, totalAmountvalue, productIds, orderDate } = req.body;

  if (!firstName || !lastName || !emailAddress || !phone || !address || !townCity || !productIds || productIds.length === 0 || !orderDate) {
    return res.status(400).json({ error: 'Incomplete billing information or missing products' });
  }

  const roleid = 3;
  const insertQuery = 'INSERT INTO user (fname, lname, email, contact, address, city, roleid) VALUES (?, ?, ?, ?, ?, ?, ?)';

  dbconnected.query(insertQuery, [firstName, lastName, emailAddress, phone, address, townCity, roleid], (err, userResult) => {
    if (err) {
      console.error('Error storing user information:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (userResult.affectedRows !== 1) {
      console.error('Error storing user information');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('User information stored successfully');
    const userid = userResult.insertId;
    const orderInsertQuery = 'INSERT INTO `order` (userid, subtotal, grandtotal, orderdate) VALUES (?, ?, ?, ?)';

    dbconnected.query(orderInsertQuery, [userid, subtotalvalue, totalAmountvalue, orderDate], (err, orderResult) => {
      if (err) {
        console.error('Error storing order information:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (orderResult.affectedRows !== 1) {
        console.error('Error storing order information');
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      console.log('Order information stored successfully');
      const orderid = orderResult.insertId;

      const insertOrderItemsAndUpdateProducts = productIds.map((productId) => {
        return new Promise((resolve, reject) => {
          const orderItemInsertQuery = 'INSERT INTO orderitem (orderid, productid) VALUES (?, ?)';
          dbconnected.query(orderItemInsertQuery, [orderid, productId], (err) => {
            if (err) {
              return reject(err);
            }
            const updateProductStatusQuery = 'UPDATE products SET status = "out of stock" WHERE productid = ?';
            dbconnected.query(updateProductStatusQuery, [productId], (err) => {
              if (err) {
                return reject(err);
              }
              resolve();
            });
          });
        });
      });

      Promise.all(insertOrderItemsAndUpdateProducts)
        .then(() => {
          const mailOptions = {
            to: emailAddress,
            subject: 'Order Confirmation',
            html: `
              <p>Thank you for placing your order! Your order# is <strong>${orderid}</strong>.</p>
            `
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
            }
          });

          console.log('Order and billing information stored successfully');
          return res.status(200).json({ message: 'Order and billing information stored successfully', orderId: orderid });
        })
        .catch((err) => {
          console.error('Error storing order items or updating product status:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        });
    });
  });
});




 Router.get('/api/filterOptions', (req, res) => {
   const sizesQuery = 'SELECT DISTINCT size FROM products';
   const brandsQuery = 'SELECT DISTINCT brand FROM products';
   const conditionsQuery = 'SELECT DISTINCT shoecondition FROM products';
   const productidQuery = 'SELECT productid FROM products';
 
   dbconnected.query(sizesQuery, (err, sizesRows) => {
     if (err) {
       console.error('Error fetching sizes:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
 
     dbconnected.query(brandsQuery, (err, brandsRows) => {
       if (err) {
         console.error('Error fetching brands:', err);
         return res.status(500).json({ error: 'Internal Server Error' });
       }
 
       dbconnected.query(conditionsQuery, (err, conditionsRows) => {
         if (err) {
           console.error('Error fetching conditions:', err);
           return res.status(500).json({ error: 'Internal Server Error' });
         }
 
         dbconnected.query(productidQuery, (err, productidRows) => {
           if (err) {
             console.error('Error fetching product IDs:', err);
             return res.status(500).json({ error: 'Internal Server Error' });
           }
 
           const filterOptions = {
             productids: productidRows.map((row) => row.productid),
             sizes: sizesRows.map((row) => row.size),
             brands: brandsRows.map((row) => row.brand),
             conditions: conditionsRows.map((row) => row.shoecondition),
           };
 
           console.log('Filter options:', filterOptions);
           res.json(filterOptions);
           console.log('Filter options fetched successfully');
         });
       });
     });
   });
 });


 Router.get('/api/products_list_mens', (req, res) => {
   const query = `
     SELECT * 
     FROM products
     WHERE category = 'men'
   `;
 
   dbconnected.query(query, (err, rows) => {
     if (err) {
       console.error('Error fetching product list:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
 
     res.json(rows);
     console.log('Request handled successfully');
   });
 });



 Router.get('/api/products_list_womens', (req, res) => {
   const query = `
     SELECT * 
     FROM products
     WHERE category = 'women'
   `;
 
   dbconnected.query(query, (err, rows) => {
     if (err) {
       console.error('Error fetching product list:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
 
     res.json(rows);
     console.log('Request handled successfully');
   });
 });



 Router.get('/api/product_details/:product_id', (req, res) => {
   const product_id = req.params.product_id;
   const query = 'SELECT * FROM products WHERE productid = ?';
 
   dbconnected.query(query, [product_id], (err, rows) => {
     if (err) {
       console.error('Error fetching product details:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
 
     if (rows.length === 0) {
       return res.status(404).json({ error: 'Product not found' });
     }
 
     res.json(rows[0]);
     console.log('Product details fetched successfully');
   });
 });

 


 Router.get('/api/reviews/:product_id', (req, res) => {
   const product_id = req.params.product_id;
   const query = 'SELECT email, text, rating FROM reviews WHERE productid = ?';
 
   dbconnected.query(query, [product_id], (err, rows) => {
     if (err) {
       console.error('Error fetching reviews:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
 
     if (rows.length === 0) {
       return res.status(404).json({ error: 'No reviews found for the given product id' });
     }
 
     console.log('Reviews fetched successfully:', rows);
     res.json(rows);
   });
 });




 Router.get('/api/search_products', (req, res) => {
   const { query } = req.query;
 
   if (!query) {
     return res.status(400).json({ error: 'Missing search query' });
   }
 
   const searchQuery = `
     SELECT DISTINCT productname FROM products
     WHERE productname LIKE ?;
   `;
 
   dbconnected.query(searchQuery, [`%${query}%`], (err, rows) => {
     if (err) {
       console.error('Error fetching search results:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
 
     if (rows.length === 0) {
       return res.json({ message: 'No products found for the given query' });
     }
 
     const productNames = rows.map((row) => row.productname);
     res.json(productNames);
     console.log('Search results fetched successfully');
   });
 });



 Router.get('/api/find_products', (req, res) => {
   const { query } = req.query;
 
   if (!query) {
     return res.status(400).json({ error: 'Missing search query' });
   }
 
   const searchQuery = `
     SELECT * FROM products
     WHERE productname LIKE ?;
   `;
 
   dbconnected.query(searchQuery, [`%${query}%`], (err, rows) => {
     if (err) {
       console.error('Error fetching search results:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
 
     if (rows.length === 0) {
       return res.json({ message: 'No products found for the given query' });
     }
 
     res.json(rows);
     console.log('Search results fetched successfully');
   });
 });

 

 Router.post('/api/add_review', (req, res) => {
   const { email, product_id, text, customerId, rating, date, orderId } = req.body;
 
   if (!email || !product_id || !text || !customerId || !rating || !date || !orderId) {
     return res.status(400).json({ error: 'Incomplete review data' });
   }
 
   const checkOrderQuery = 'SELECT COUNT(*) as count FROM `order` WHERE orderid = ?';
 
   dbconnected.query(checkOrderQuery, [orderId], (err, orderCheckResult) => {
     if (err) {
       console.error('Error checking order:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
 
     if (orderCheckResult[0].count === 0) {
       return res.status(404).json({ error: 'Order not found' });
     }
 
     const insertQuery = 'INSERT INTO reviews (productid, text, customerid, rating, date, orderid, email) VALUES (?, ?, ?, ?, ?, ?, ?)';
 
     dbconnected.query(insertQuery, [product_id, text, customerId, rating, date, orderId, email], (err, result) => {
       if (err) {
         console.error('Error adding review:', err);
         return res.status(500).json({ error: 'Internal Server Error' });
       }
 
       if (result.affectedRows === 1) {
         console.log('Review added successfully');
         return res.json({ message: 'Review added successfully' });
       } else {
         console.error('Error adding review');
         return res.status(500).json({ error: 'Internal Server Error' });
       }
     });
   });
 });

 Router.put('/api/verify_otp', (req, res) => {
   const { otp } = req.body;
   console.log(otp);
 
   const updateQuery = 'UPDATE user SET status = ? WHERE otp = ?';
 
   dbconnected.query(updateQuery, ['verified', otp], (err, result) => {
     if (err) {
       console.error('Error verifying OTP:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
 
     if (result.affectedRows === 1) {
       res.json({ message: 'Email verified successfully' });
     } else {
       res.status(400).json({ error: 'Invalid OTP or email already verified' });
     }
   });
 });

 

 Router.get('/api/order/grandTotal', (req, res) => {
   const userEmail = req.query.email;
   console.log(userEmail);
 
   const query = `
     SELECT grandtotal FROM \`order\` 
     WHERE userid IN (SELECT userid FROM user WHERE email = ?)
   `;
 
   dbconnected.query(query, [userEmail], (err, results) => {
     if (err) {
       console.error('Error fetching grand totals:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
 
     if (results.length === 0) {
       return res.json([]); // Return an empty array if no grand totals found
     }
 
     const grandTotals = results.map(result => result.grandtotal);
     res.json(grandTotals);
   });
 });




 const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'nauman170462@gmail.com',
     pass: 'efcyyqcwvcblkahv'
   }
 });
 
 Router.post('/api/usersignup', (req, res) => {
   
   const { email, firstName, lastName, password, status, DOB, otp } = req.body;
   console.log(req.body);
   if (!email || !firstName || !lastName || !password || !status || !DOB || !otp) {
     return res.status(400).json({ error: 'Incomplete user data' });
   }
 
   const roleid = 3;
   bcrypt.hash(password, 10, (err, hashedPassword) => {
     if (err) {
       console.error('Error hashing password:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
 
     const insertQuery = 'INSERT INTO user (email, fname, lname, password, DOB, roleid, otp, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
 
     dbconnected.query(insertQuery, [email, firstName, lastName, hashedPassword, DOB, roleid, otp, status], (err, result) => {
       if (err) {
         console.error('Error registering user:', err);
         return res.status(500).json({ error: 'Internal Server Error' });
       }
 
       if (result.affectedRows === 1) {
         console.log('User registered successfully');
 
         const emailContent = `
           <div style="font-family: Arial, sans-serif; color: black;">
             <div style="background-color: #f7f7f7; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
               <div style="text-align: center;">
                 <img src="cid:logo" alt="Logo" style="width: 200px; margin-bottom: 5px;">
               </div>
               <h2 style="color: black; text-align: center;">Verify Your Email Address</h2>
               <p style="font-size: 18px; text-align: center; color: black;">Hello ${firstName} ${lastName},</p>
               <p style="font-size: 16px; text-align: center; color: black;">Please use the following One Time Password (OTP) to verify your email address:</p>
               <div style="text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; color: black;">${otp}</div>
             </div>
           </div>
         `;
 
         const mailOptions = {
           to: email,
           subject: 'Verify Your Email Address',
           html: emailContent,
         //   attachments: [{
         //     filename: 'logo.png',
         //     path: path.join(__dirname, 'images', 'logo.png'),
         //     cid: 'logo' // same cid value as in the html img src
         //   }]
         };
 
         transporter.sendMail(mailOptions, (error, info) => {
           if (error) {
             console.log('Error sending email:', error);
           } else {
             console.log('Email sent:', info.response);
           }
         });
 
         res.json({ message: 'User registered successfully' });
       } else {
         console.error('Error registering user');
         res.status(500).json({ error: 'Internal Server Error' });
       }
     });
   });
 });

 

 Router.post('/send-email', (req, res) => {
   const { to, subject, text } = req.body;
 
   const mailOptions = {
     from: 'nauman170462@gmail.com',
     to: to,
     subject: subject,
     text: text
   };
 
   transporter.sendMail(mailOptions, (error, info) => {
     if (error) {
       console.log(error);
       return res.status(500).send('Error sending email');
     } else {
       console.log('Email sent: ' + info.response);
       return res.send('Email sent successfully');
     }
   });
 });

 

 Router.get('/api/products/:subcategory', (req, res) => {
   const subcategory = req.params.subcategory;
   const query = 'SELECT * FROM products WHERE subcategory = ?';
 
   dbconnected.query(query, [subcategory], (err, rows) => {
     if (err) {
       console.error('Error fetching products:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
 
     if (rows.length === 0) {
       return res.status(404).json({ error: 'No products found for the given subcategory' });
     }
 
     res.json(rows);
     console.log('Category product fetched successfully');
   });
 });


 
 Router.get('/api/productEffects/:productId', (req, res) => {
   console.log("Product effect API called!");
   const productId = req.params.productId;
   console.log("Product id is:", productId);
 
   const query = 'SELECT effect FROM products WHERE productid = ?';
 
   dbconnected.query(query, [productId], (err, rows) => {
     if (err) {
       console.error('Error fetching product effects:', err);
       return res.status(500).send('Internal Server Error');
     }
 
     if (rows.length > 0) {
       return res.send(rows[0].effect);
     } else {
       return res.status(404).send('Product not found');
     }
   });
 });



Router.get("/", (req, res) => {
   const data = [{ name: "john", email: "john@gmail.com" }];
   res.send(data);
});

Router.get("/api/user", (req, res) => {
   dbconnected.query("SELECT tenantid, firstname, phone, email, service, address, status FROM tenant", (err, rows, fields) => {
      if (!err) {
         res.send(rows);
      } else {
         console.log(err);
      }
   });
});


Router.post("/api/addtenant", (req, res) => {
   const firstname = req.body.firstname;
   const lastname = req.body.lastname;
   const phone = req.body.phone;
   const email = req.body.email;
   const service = req.body.service;
   const address = req.body.address;
   const status = req.body.status;
   console.log("requestbody :", req.body);
   var sql = `INSERT INTO tenant (firstname, last_name, phone, email, service, address, status) VALUES("${firstname}", "${lastname}", "${phone}", "${email}", "${service}", "${address}", "Paid")`;

   console.log("tenant req bosy", req.body);
   dbconnected.query(sql, (err, result) => {
      if (!err) {
         res.status(200).json({ success: "Tenant record submitted successfully" });
      } else {
         console.log(err);
      }
   });

});

Router.delete("/api/deleteuser/:phone", (req, res) => {
   console.log("DELETE API START");
   const phone = req.params.phone;
   console.log(phone);
   dbconnected.query("DELETE FROM tenant WHERE phone = ?", [phone], (err, result) => {
      if (!err) {
         res.status(200).json({ success: "User record deleted successfully!" });
      } else {
         console.log(err);
         res.status(500).json({ error: "Internal Server Error" });
      }
   });
});

Router.get("/api/edituser/:phone", (req, res) => {
   const phone = req.params.phone;
   dbconnected.query("SELECT * FROM tenant WHERE phone = ?", [phone], (err, rows) => {
      if (!err) {
         res.send(rows[0]);
      } else {
         console.log(err);
         res.status(500).send("An error occurred while fetching user data.");
      }
   });
});

Router.put("/api/updateuser/:phone", (req, res) => {
   const phone = req.params.phone;
   const { firstname, last_name, email, service, address } = req.body;
   var sql =
      "UPDATE tenant SET firstname=?, last_name=?, email=?, service=?, address=? WHERE phone=?";

   dbconnected.query(
      sql,
      [firstname, last_name, email, service, address, phone],
      (err, result) => {
         if (!err) {
            if (result.affectedRows > 0) {
               res.status(200).json({ success: "Record updated!" });
            } else {
               res.status(404).json({ error: "Record not found" });
            }
         } else {
            console.log(err);
            res.status(500).json({ error: "An error occurred" });
         }
      }
   );
});

Router.post("/api/addsubscription", (req, res) => {
   const tenantname = req.body.tenantname;
   const phone = req.body.phone;
   const service = req.body.service;
   const startdate = req.body.startdate;
   const enddate = req.body.enddate;
   const monthlyamount = req.body.monthlyamount;


   var sql = `INSERT INTO subscriptionmanagement (tenantname, phone, service, startdate, enddate, monthlyamount) VALUES("${tenantname}", "${phone}", "${service}", "${startdate}", "${enddate}", "${monthlyamount}")`;

   dbconnected.query(sql, (err, result) => {
      if (!err) {
         res.status(200).json({ success: "Subscription record submitted successfully" });
      } else {
         console.log(err);
      }
   });
});


Router.get("/api/subuser", (req, res) => {
   dbconnected.query("SELECT * FROM subscriptionmanagement", (err, rows) => {
      if (!err) {
         res.send(rows);
      } else {
         console.log(err);
      }
   });
});

Router.post("/api/addpayment", (req, res) => {
   const tenantname = req.body.tenantname;
   const amount = req.body.monthlyamount;
   const serviceprovider = req.body.serviceprovider;



   var sql = `INSERT INTO tenantspayment (tenantname, amount, serviceprovider, status ) VALUES("${tenantname}", "${amount}", "${serviceprovider}", "unpaid")`;

   dbconnected.query(sql, (err, result) => {
      if (!err) {
         res.status(200).json({ success: "Subscription record submitted successfully" });
      } else {
         console.log(err);
      }
   });
});

Router.get("/api/payments", (req, res) => {
   dbconnected.query("SELECT id, tenantname, amount, serviceprovider,  DATE_FORMAT(date, '%Y-%m-%d') AS date ,status  FROM tenantspayment", (err, rows) => {
      if (!err) {
         res.send(rows);
      } else {
         console.log(err);
      }
   });
});



Router.post("/api/addadminupdated", (req, res) => {
   const sql = "INSERT INTO user (fname, lname, email, contact, address, username, password, roleid) VALUES (?)";
   bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
      if (err) return res.json({ Error: "Error for hashing password" });
      const values = [
         req.body.firstname,
         req.body.lastname,
         req.body.email,
         req.body.phone,
         req.body.address,
         req.body.username,
         hash,
         2
      ]
      dbconnected.query(sql, [values], (err, result) => {
         if (err) return res.json({ Error: "Inserting data Error in server." });
         return res.json({ Status: "Success" });
      })
   })

})

Router.post("/api/addsuperadminupdated", (req, res) => {
   console.log("aaaaaaaaaaaaadd admin");
   console.log(req.body);
   const sql = "INSERT INTO user (fname, lname, email, contact, address, username, password, roleid) VALUES (?)";
   bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
      if (err) return res.json({ Error: "Error for hashing password" });
      const values = [
         req.body.firstname,
         req.body.lastname,
         req.body.email,
         req.body.phone,
         req.body.address,
         req.body.username,
         hash,
         1
      ]
      dbconnected.query(sql, [values], (err, result) => {
         if (err) return res.json({ Error: "Inserting data Error in server." });
         return res.json({ Status: "Success" });
      })
   })

})



Router.post("/api/loginupdated", (req, res) => {
   const sql = "SELECT * FROM user WHERE contact = ? && roleid=2";
   console.log("loginapi calllllllllllllllllllllllll");
   console.log(req.body);
   dbconnected.query(sql, [req.body.phone], (err, data) => {
      if (err) return res.json({ Error: "Login error in server!" });
      if (data.length > 0) {
         bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
            if (err) return res.json({ Error: "Password compare error!" });
            if (response) {
               const name = data[0].fname;
               const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", { expiresIn: '1d' });
               // Send the token along with the response
               return res.json({ Login: true, data, token });
            } else {
               return res.json({ Status: "Password not matched!" });
            }
         })
      } else {
         return res.json({ Error: "Credentials do not exist!" });
      }
   })
})


Router.post("/api/superadminloginupdated", (req, res) => {
   console.log("admin login api caleed!");
   console.log("phone number is :", req.body.phone);
   const sql = "SELECT * FROM user WHERE contact = ? and roleid=1";
   dbconnected.query(sql, [req.body.phone], (err, data) => {
      if (err) return res.json({ Error: "Login error in server!" });
      if (data.length > 0) {
         console.log("data lenth greater than zero");
         bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
            if (err) return res.json({ Error: "Password compare error!" });
            if (response) {
               const name = data[0].fname;
               console.log("name :", name);
               const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", { expiresIn: '1d' });
               // Send the token along with the response
               return res.json({ Login: true, data, token });
            } else {
               return res.json({ Status: "Password not matched!" });
            }
         })
      } else {
         return res.json({ Error: "Credentials do not exist!" });
      }
   })
})


function verifyToken(req, resp, next) {
   let token = req.headers.authorization;
   if (token) {
      token = token.split(' ')[1];
      jwt.verify(token, "our-jsonwebtoken-secret-key", (err, valid) => {
         if (err) {
            resp.status(401). send({ result: "Please provide valid token!" });
         } else {
            next();
         }
      })

   } else {
      resp.status(403).send({ result: "Please send token with header!" });
   }
   console.log("verifyjwt middleware called!", token);

}


// Router.get("/api/checkAuth", verifyjwt, (req, res) => {
//    return res.json("Authenticated");
// })



// Router.get("/api/products", verifyToken, (req, res) => {
//    dbconnected.query("SELECT  * FROM products", (err, rows, fields) => {
//       if (!err) {
//          res.send(rows);
//       } else {
//          console.log(err);
//       }
//    });
// });

Router.get("/api/products", (req, res) => {
   dbconnected.query("SELECT  * FROM products", (err, rows, fields) => {
      if (!err) {
         res.send(rows);
      } else {
         console.log(err);
      }
   });
});

Router.delete("/api/deleteproduct/:productid", (req, res) => {
   const productid = req.params.productid;
   dbconnected.query("DELETE FROM products WHERE productid = ?", [productid], (err, result) => {
      if (!err) {
         res.status(200).json({ success: "Product deleted successfully!" });
      } else {
         console.log(err);
         res.status(500).json({ error: "Internal Server Error" });
      }
   });
});


const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      let destinationFolder;
      // You can add your condition here to determine the destination folder
      if (file.fieldname === 'image') {
         destinationFolder = 'images';
      } else {
         destinationFolder = 'effects';
      }
      cb(null, destinationFolder);
   },
   filename: (req, file, cb) => {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage
});

Router.post("/api/addproduct", (req, res) => {
   console.log(req.body);
   const productname = req.body.productname;
   const brand = req.body.brand;
   const price = req.body.price;
   const size = req.body.size;
   const shoecoditionn = req.body.shoecondition;
   const inventory = req.body.inventory;
   const category = req.body.category;
   const description = req.body.description;

   var sql = `INSERT INTO  products(productname, brand, price, size, shoecondition, inventoryid, category, status, description) VALUES("${productname}", "${brand}", "${price}", "${size}", "${shoecoditionn}", "${inventory}", "${category}", "In Stock", "${description}")`;

   dbconnected.query(sql, (err, result) => {
      if (!err) {
         res.status(200).json({ success: "Product added successfully" });
      } else {
         console.log(err);
      }
   });
});

Router.post('/upload', upload.single('image'), (req, res) => {

   const image = req.file.filename;
   const sql = `INSERT INTO products (image) VALUES("${image}")`;

   dbconnected.query(sql, (err, result) => {
      if (!err) {
         res.status(200).json({ success: "Image uploaded and inserted into the database successfully" });
      } else {
         console.log(err);
         res.status(500).json({ error: "Internal Server Error" });
      }
   });

})


Router.post("/api/addproduct1", upload.fields([{ name: 'image', maxCount: 5 }, { name: 'effect', maxCount: 1 }]), (req, res) => {

   console.log("add product api caled!");
   const productname = req.body.productname;
   const brand = req.body.brand;
   const price = req.body.price;
   const size = req.body.size;
   const shoecoditionn = req.body.shoecondition;
   const inventory = req.body.inventory;
   const category = req.body.category;
   const description = req.body.description;
   console.log(req.body);

   const images = req.files['image'].map(file => file.filename);
   const effect = req.files['effect'][0].filename; // Assuming only one effect file is uploaded

   var sql = `
       INSERT INTO products (
           productname, brand, price, size, shoecondition, inventoryid,
           category, status, description, image, effect
       ) VALUES (
           "${productname}", "${brand}", "${price}", "${size}",
           "${shoecoditionn}", "${inventory}", "${category}",
           "In Stock", "${description}", "${images}", "${effect}"
       )
   `;

   dbconnected.query(sql, (err, result) => {
      if (!err) {
         res.status(200).json({ success: "Product, images, and effect added successfully" });
      } else {
         console.log(err);
         res.status(500).json({ error: "Internal Server Error" });
      }
   });
});


Router.get("/api/editproduct/:productid", (req, res) => {
   const productid = req.params.productid;
   dbconnected.query("SELECT * FROM products WHERE productid = ?", [productid], (err, rows) => {
      if (!err) {
         res.send(rows[0]);
      } else {
         console.log(err);
         res.status(500).send("An error occurred while fetching user data.");
      }
   });
});


Router.put("/api/updateproduct/:productid", (req, res) => {
   const productid = req.params.productid;
   const { productname, brand, price, size, shoecondition, inventory, category, description } = req.body;

   var sql = "UPDATE products SET productname=?, brand=?, price=?, size=?, shoecondition=?, inventoryid=?, category=?, description=? WHERE productid=?";

   dbconnected.query(
      sql,
      [productname, brand, price, size, shoecondition, inventory, category, description, productid],
      (err, result) => {
         if (!err) {
            if (result.affectedRows > 0) {
               res.status(200).json({ success: "Record updated!" });
            } else {
               res.status(404).json({ error: "Record not found" });
            }
         } else {
            console.log(err);
            res.status(500).json({ error: "An error occurred" });
         }
      }
   );
});



// Router.get("/api/getorder", (req, res) => {
//    dbconnected.query("SELECT o.orderid, o.customerid, u.fname, DATE_FORMAT(o.orderdate, '%Y-%m-%d') AS orderdate, o.status, o.subtotal, o.grandtotal FROM `order` AS o JOIN `user` AS u ON o.customerid = u.userid", (err, rows, fields) => {
//       if (!err) {
//          res.send(rows);
//       } else {
//          console.log(err);
//          res.status(500).send("Internal Server Error");
//       }
//    });
// });


// Router.get("/api/getorder", verifyToken, (req, res) => {
//    dbconnected.query("SELECT o.orderid, o.customerid, u.fname, DATE_FORMAT(o.orderdate, '%Y-%m-%d') AS orderdate, o.status, o.subtotal, o.grandtotal FROM `order` AS o JOIN `user` AS u ON o.customerid = u.userid", (err, rows, fields) => {
//       if (!err) {
//          res.send(rows);
//       } else {
//          console.log(err);
//          res.status(500).send("Internal Server Error");
//       }
//    });
// });

Router.get("/api/getorder", (req, res) => {
   console.log("order api called!");
   dbconnected.query("SELECT o.orderid, o.userid, u.fname, DATE_FORMAT(o.orderdate, '%Y-%m-%d') AS orderdate, o.status, o.subtotal, o.grandtotal FROM `order` AS o JOIN `user` AS u ON o.userid = u.userid", (err, rows, fields) => {
      if (!err) {
         console.log(rows);
         res.send(rows);
      } else {
         console.log(err);
         res.status(500).send("Internal Server Error");
      }
   });
});


Router.delete("/api/deleteorder/:orderid", (req, res) => {
   const orderid = req.params.orderid;
   dbconnected.query("DELETE FROM `order` WHERE orderid = ?", [orderid], (err, result) => {
      if (!err) {
         res.status(200).json({ success: "Order cancelled successfully!" });
      } else {
         console.log(err);
         res.status(500).json({ error: "Internal Server Error" });
      }
   });
});


Router.get("/api/orderitem/:orderid", (req, res) => {
   const orderid = req.params.orderid;
   dbconnected.query(
      "SELECT oi.orderitemid, oi.orderid, oi.productid, oi.price, p.productname FROM orderitem oi JOIN products p ON oi.productid = p.productid WHERE oi.orderid = ?",
      orderid,
      (err, rows) => {
         if (!err) {
            res.send(rows);
         } else {
            console.log(err);
         }
      }
   );
});



Router.get("/api/getcustomers", (req, res) => {
   dbconnected.query(
      "SELECT userid, fname, lname, email, contact, DATE_FORMAT(regdate, '%Y-%m-%d') AS regdate, roleid, city FROM user WHERE roleid=3 ",
      (err, rows) => {
         if (!err) {
            res.send(rows);
            console.log(rows);
         } else {
            console.log(err);
         }
      }
   );
});

Router.get("/api/getReviews", (req, res) => {
   dbconnected.query(
      "SELECT r.productid, r.customerid, c.customerfname, r.rating, r.text, DATE_FORMAT(r.date, '%Y-%m-%d') AS date FROM reviews r "
      +
      "JOIN customer c ON r.customerid = c.customerid ",
      //  +
      // "JOIN user u ON c.userid = u.roleid",
      (err, rows) => {
         if (!err) {
            res.send(rows);
         } else {
            console.log(err);
         }
      }
   );
});

Router.get("/api/productEffects/:productId", (req, res) => {
   console.log("Producteffect api caled!");
   const productId = req.params.productId;
   console.log("product is is:", productId);
   dbconnected.query("SELECT effect FROM products WHERE productid = ?", [productId], (err, rows, fields) => {
      if (!err) {
         if (rows.length > 0) {
            res.send(rows[0].effect);
         } else {
            res.status(404).send("Product not found");
         }
      } else {
         console.log(err); // Print the error to the console
         res.status(500).send("Internal Server Error");
      }
   });
});


Router.post("/api/adddiscount", (req, res) => {
   const discountname = req.body.discountname;
   const type = req.body.type;
   const amount = req.body.amount;
   const description = req.body.description;
   const startdate = req.body.startdate;
   const enddate = req.body.enddate;



   var sql = `
         INSERT INTO discounts (
            name, description, type, amount, startdate,
            enddate, isActive
         ) VALUES (
            "${discountname}", "${description}", "${type}", "${amount}",
            "${startdate}", "${enddate}", 1
         )
      `;

   dbconnected.query(sql, (err, result) => {
      if (!err) {
         res.status(200).json({ success: "Discount added successfully!" });
      } else {
         console.log(err);
         res.status(500).json({ error: "Internal Server Error" });
      }
   });

});


Router.get("/api/discounts", (req, res) => {
   console.log("Get Discount api called!");
   dbconnected.query("SELECT id, name, description, type, amount,DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate, DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate, isActive  FROM discounts", (err, rows, fields) => {
      if (!err) {
         res.send(rows);
         console.log(rows);
      } else {
         console.log(err);
      }
   });
});

Router.delete("/api/deletediscount/:id", (req, res) => {
   const id = req.params.id;
   dbconnected.query("DELETE FROM discounts WHERE id  = ?", [id], (err, result) => {
      if (!err) {
         res.status(200).json({ success: "Discount deleted successfully!" });
      } else {
         console.log(err);
         res.status(500).json({ error: "Internal Server Error" });
      }
   });

});

Router.put("/api/toggleDiscount/:id", (req, res) => {
   const id = req.params.id;
   // First, let's fetch the current value of isActive
   dbconnected.query("SELECT isActive FROM discounts WHERE id = ?", [id], (err, result) => {
      if (err) {
         console.log(err);
         return res.status(500).json({ error: "Internal Server Error" });
      }

      // If the query returns no rows, it means the discount with the given id doesn't exist
      if (result.length === 0) {
         return res.status(404).json({ error: "Discount not found" });
      }

      // Toggle isActive value
      const isActive = result[0].isActive === 1 ? 0 : 1;

      // Update the isActive value
      dbconnected.query("UPDATE discounts SET isActive = ? WHERE id = ?", [isActive, id], (err, result) => {
         if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
         }
         res.status(200).json({ success: "Discount updated successfully!" });
      });
   });
});






module.exports = Router;