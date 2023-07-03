//jshint esversion:6
const express = require("express")
var bodyParser = require('body-parser')
var cors = require('cors')
var mysql = require('mysql2');

const path=require('path')

var app=express()
app.use(bodyParser.json())
app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }));


var sqlObj = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "xxxxxxxx", //your mysql database password
  database:"hotel"
});

sqlObj.connect(function(err) {
  if (err) throw err;
  console.log("mysql Connected!");

});

app.get("/",function (req,res) {
   res.send("Hello world") 
})
 
app.post("/order",function (req,res) {
  var userName=req.body["username"];
  var tableNumber=req.body["tableNumber"]
    const orderItems=req.body["order"];
    console.log(req.body)
    var orderTotal=0;
    for (let [itemName, itemQuantity] of Object.entries(orderItems)) {
        console.log(itemName,itemQuantity["count"],itemQuantity["price"]);
        orderTotal+=itemQuantity["price"]
      }
    // console.log(req.body)
    console.log(orderTotal)
    var d=new Date().toISOString().split('T');
    // var dateTime=d[0]+'T'+d[1].split('.')[0];
    var order_date=d[0];
    var order_time=d[1].split('.')[0]

    var orderId=order_date+'T'+order_time+'T'+'2'
   // console.log(typeof(d[0]))
   

    //order inserting into database
    var sql = `INSERT INTO hotel.orders(order_id,customer_name,table_num,order_date,order_time,order_items,order_status,payment_status) VALUES (${JSON.stringify(orderId)}, ${JSON.stringify(userName)},${tableNumber},${JSON.stringify(order_date)},${JSON.stringify(order_time)},'${JSON.stringify(orderItems)}','Make payment to receive order...','Make payment to receive order...')`;
    sqlObj.query(sql, function (err, result) {
     if (err) throw err;
     console.log("order received");
     
     sql=""
  });

  var responseJson={orderStatus:`${userName}! Make payment to receive your order`}
  res.send(JSON.stringify(responseJson))
 
 })



 app.post("/ordersPlaced",function (req,res) {
  console.log("orders placed")
  console.log(req.body["username"])
  var d=new Date().toISOString();
  var todays_date=d.split('T')[0];
var username=req.body["username"]
var tableNumber=req.body["tableNumber"]

  var sql=`SELECT * FROM hotel.orders where customer_name=${JSON.stringify(username)} and table_num=${tableNumber}`; // where order_date=${todays_date}

  sqlObj.query(sql,function (err, result) {
    if (err) throw err;
    console.log("your orders");
    console.log(result)
    res.send(result) 
 })  

// var results=getAllOrders()
// res.send(results);

})

app.get("/allOrders",function (req,res) {
  console.log("all orders...")


  var d=new Date().toISOString();
  var todays_date=d.split('T')[0];

  var sql=`SELECT * FROM hotel.orders where order_status<>'Order Received...'`; 

  sqlObj.query(sql,function (err, result) {
    if (err) throw err;
    console.log("your orders");
    console.log(result)
    res.send(result) 
 })  

})

app.get("/allPaidOrders",function (req,res) {
  console.log("all orders...")


  var d=new Date().toISOString();
  var todays_date=d.split('T')[0];

  var sql=`SELECT * FROM hotel.orders where payment_status='Payment Done...' and order_status<>'Order Received...'`; 

  sqlObj.query(sql,function (err, result) {
    if (err) throw err;
    console.log("your orders");
    console.log(result)
    res.send(result) 
 })  

})

app.get("/ordersHistory",function (req,res) {
  console.log("all orders...")


  var d=new Date().toISOString();
  var todays_date=d.split('T')[0];

  

  var sql=`SELECT * FROM hotel.orders where order_status='Order Received...' and order_date=CURDATE()`; 

  sqlObj.query(sql,function (err, result) {
    if (err) throw err;
    console.log("your orders");
    console.log(result)
    res.send(result) 
 })  

 })





app.put("/ordersUpdate",function (req,res) {
  console.log("order update:")
  
  var modifyingOrderId=req.body["order_id"];
  console.log(modifyingOrderId)
  
  var sql=`UPDATE hotel.orders SET order_status='Out for serving...' where order_id='${modifyingOrderId}'`; 

  sqlObj.query(sql,function (err, result) {
    if (err) throw err;
    console.log("your orders");
    console.log(result)
    res.send(result) 
 }) 

})


app.put("/updateOrderStatus",function (req,res) {
  console.log("order payment update:")
  
  var modifyingOrderId=req.body["order_id"];
  console.log(modifyingOrderId)
  
var sql=`UPDATE hotel.orders SET order_status='Order Received...' where order_id='${modifyingOrderId}'`; 

sqlObj.query(sql,function (err, result) {
    if (err) throw err;
    console.log("your orders");
    console.log(result)
    // res.send(result) 
 }) 
  
})

  app.put("/updatePaymentStatus",function (req,res) {
    console.log("order payment update:")
    
    var modifyingOrderId=req.body["order_id"];
    console.log(modifyingOrderId)
    
  var sql=`UPDATE hotel.orders SET payment_status='Payment Done...',order_status='Food is being prepared...' where order_id='${modifyingOrderId}'`; 
 
  sqlObj.query(sql,function (err, result) {
      if (err) throw err;
      console.log("your orders");
      console.log(result)
      // res.send(result) 
   }) 
    
})

app.listen(3000,function(){
    console.log("server started at 3000")
})