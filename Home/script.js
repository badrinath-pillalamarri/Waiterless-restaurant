var userName = localStorage.username;
var tableNumber = parseInt(localStorage.tableNumber);
document.querySelectorAll(".userName")[0].innerHTML = tableNumber;
document.querySelectorAll(".userName")[1].innerHTML =
  userName + " #" + tableNumber;
console.log(userName + " #" + tableNumber);

var localhost ="localhost"; //or your device ip address
var port = 3000;

const TimerIds = new Set();

const Kitchen_Items = [
  {
    "item-name": "Jeera Rice",
    "item-key": "jeeraRice",
    description: "Jeera and rice mixture with gravy",
    img_url:
      "https://myfoodstory.com/wp-content/uploads/2018/07/Perfect-Jeera-Rice-Indian-Cumin-Rice-4.jpg",
    available: true,
    "item-time": 10,
    price: 100,
  },
  {
    "item-name": "Chicken biryani",
    "item-key": "chickenBiryani",
    description:
      "Combination of chicken and rice with authentic indian spices.",
    img_url:
      "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg",
    available: true,
    "item-time": 25,
    price: 325,
  },
  {
    "item-name": "Veg biryani",
    "item-key": "vegBiryani",
    description: "Mixture of various vegetables",
    img_url: "https://i.ytimg.com/vi/NtuIRDuIvgs/maxresdefault.jpg",
    available: true,
    "item-time": 20,
    price: 210,
  },
  {
    "item-name": "Shawarma",
    "item-key": "shawarma",
    description: "rumali roti plus chicken",
    img_url:
      "https://media-cdn.tripadvisor.com/media/photo-s/1c/d4/62/89/chicken-shawarma-amigo.jpg",
    available: true,
    "item-time": 5,
    price: 180,
  },
  {
    "item-name": "Paneer Tikka",
    "item-key": "paneerTikka",
    description: "Frying panner on fire",
    img_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3GtJ0b0SQ0O3lHn1_7XqB9LlJHeULgEozTg&usqp=CAU",
    available: true,
    "item-time": 5,
    price: 220,
  },
  {
    "item-name": "Butter Chicken",
    "item-key": "butterChicken",
    description: "chicken plus butter mix",
    img_url:
      "https://static.toiimg.com/thumb/53205522.cms?width=1200&height=900",
    available: true,
    "item-time": 20,
    price: 225,
  },
  {
    "item-name": "Butter naan",
    "item-key": "butterNaan",
    description: "rooti bread",
    img_url: "https://foodess.com/wp-content/uploads/2023/02/Butter-Naan-3.jpg",
    available: true,
    "item-time": 10,
    price: 40,
  },
  {
    "item-name": "Rumali roti",
    "item-key": "rumaliRoti",
    description: "roti made with maida",
    img_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvnPQYhSQpvWNbmXGeaxAWdihbYG6uLMrKNg&usqp=CAU",
    available: true,
    "item-time": 10,
    price: 15,
  },
  {
    "item-name": "Veg Burger",
    "item-key": "vegBurger",
    description:
      "Red pesto veggie goujons with sandwich sauce and shredded lettuce in a sesame topped bun.",
    img_url:
      "https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-Vegetable-Deluxe-2:1-3-product-tile-desktop?wid=829&hei=515&dpr=off",
    available: true,
    "item-time": 15,
    price: 69,
  },
  {
    "item-name": "",
    "item-key": "",
    description: "",
    img_url: "",
    available: false,
    price: 180,
  },
  {
    "item-name": "",
    "item-key": "",
    description: "",
    img_url: "",
    available: false,
    price: 180,
  },
  {
    "item-name": "",
    "item-key": "",
    description: "",
    img_url: "",
    available: false,
    price: 180,
  },
  {
    "item-name": "",
    "item-key": "",
    description: "",
    img_url: "",
    available: false,
    price: 180,
  },
  {
    "item-name": "",
    "item-key": "",
    description: "",
    img_url: "",
    available: false,
    price: 180,
  },
];

const order = {};

var menu_items = document.querySelector(".menu-items");
var orderSummary = document.querySelector(".order-summary");

for (let i = 0; i < Kitchen_Items.length; i++) {
  var fetchDiv = document.querySelector(".menu-items").innerHTML;
  if (Kitchen_Items[i].available) {
    menu_items.innerHTML =
      `<div class="col md-4 ms-6">
    <div class="card card-style" style="width: 17.5rem;">
      <img class="card-img-top food-img" src=${
        Kitchen_Items[i]["img_url"]
      } alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title item-name">${Kitchen_Items[i]["item-name"]}</h5>
        <p class="card-text">${
          Kitchen_Items[i]["description"].slice(0, 20) + "..."
        }</p>
        <div class="price-info">
        <span class="price-item">
        <span>Rs.</span>
        <span class="${Kitchen_Items[i]["item-key"] + "-price"}">${
        Kitchen_Items[i]["price"]
      }</span>
        </span>
        <span class="space"></span>
        <span class="item-time">
        <a class="${Kitchen_Items[i]["item-key"] + "-time"}">${
        Kitchen_Items[i]["item-time"]
      }</a>
        <span>mins</span>
        </span>
        <span class="space"></span>
       <span class="add-sub-btn">
        <a type="button" name=${
          Kitchen_Items[i]["item-key"]
        } class="btn btn-light subtractItem btn-sm">-</a>
        <a class="item-count" id=${Kitchen_Items[i]["item-key"]}>0</a>
        <a type="button" name=${
          Kitchen_Items[i]["item-key"]
        } class="btn btn-light addItem btn-sm">+</a>
        </span>
        </div>
        </div>
        </div>
</div>` + fetchDiv;
  }
}

function itemIdToName(id) {
  var itemName = "";

  for (let index = 0; index < id.length; index++) {
    var ch = id[index];
    if (ch >= "A" && ch <= "Z") {
      itemName = itemName + " " + ch;
      itemName[index].toUpperCase();
      continue;
    }

    itemName += ch;
  }
  itemName =
    itemName.slice(0, 1).toUpperCase() + itemName.slice(1, itemName.length);
  console.log("item name: " + itemName);
  return itemName;
}

$(".addItem").on("click", function () {
  $(".order-submit").css("visibility", "visible");
  // console.log(this.name+"-price")

  var itemPrice = parseInt(
    document.querySelector("." + this.name + "-price").innerHTML
  );
  var count = parseInt(document.querySelector("#" + this.name).innerHTML);
  var itemPreparationTime = parseInt(
    document.querySelector("." + this.name + "-time").innerHTML
  );
  count++;
  document.querySelector("#" + this.name).innerHTML = count;
  // console.log(count)
  var itemName = itemIdToName(this.name);
  order[itemName] = {};
  order[itemName]["count"] = count;
  order[itemName]["price"] = count * itemPrice;
  order[itemName]["time"] = itemPreparationTime;
  console.log(itemPreparationTime);

  console.log("order: ");
  console.log(order);

  orderSummaryUpdate(order);
});

$(".subtractItem").on("click", function () {
  var count = parseInt(document.querySelector("#" + this.name).innerHTML);
  var itemPrice = parseInt(
    document.querySelector("." + this.name + "-price").innerHTML
  );
  var itemPreparationTime = parseInt(
    document.querySelector("." + this.name + "-time").innerHTML
  );

  if (count > 0) count--;
  document.querySelector("#" + this.name).innerHTML = count;

  var itemName = itemIdToName(this.name);

  order[itemName] = {};
  order[itemName]["count"] = count;
  order[itemName]["price"] = count * itemPrice;
  order[itemName]["time"] = itemPreparationTime;
  console.log(itemPreparationTime);

  if (count == 0) delete order[itemName];
  console.log(order);
  orderSummaryUpdate(order);
  if (Object.keys(order).length === 0 && order.constructor === Object) {
    orderSummary.innerHTML = "";
    $(".order-submit").css("visibility", "hidden");
  }
});

function orderSummaryUpdate(order) {
  console.log("update:");
  orderSummary.innerHTML = "";
  var orderTotal = 0;
  for (let [itemName, itemQuantity] of Object.entries(order)) {
    var fetchDiv = document.querySelector(".order-summary").innerHTML;
    orderSummary.innerHTML =
      fetchDiv +
      `<h5>${itemName} ${" "} x ${"  "}   ${itemQuantity["count"]}---${
        itemQuantity["price"]
      }</h5>`;
    console.log(itemName, itemQuantity["count"], itemQuantity["price"]);
    orderTotal += itemQuantity["price"];
  }
  orderSummary.innerHTML += `<h3 class="order-total">Order Total == ${orderTotal}</h3>`;
}

$(".order-submit").on("click", orderIt);

function orderIt() {
  var orderWithUsername = {};
  orderWithUsername["username"] = userName;
  orderWithUsername["tableNumber"] = tableNumber;
  orderWithUsername["order"] = order;
  console.log("ordering...", orderWithUsername);
  $(".order-submit").css("visibility", "hidden");
  orderSummary.innerHTML = `<h3>Order Processing...</h3>`;
  let sendOrder = fetch(`http://${localhost}:${port}/order`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderWithUsername),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("response on ordering...");
      console.log("Success:", data);
      orderSummary.innerHTML = "";
      orderSummary.innerHTML += `<h3>${JSON.stringify(
        data["orderStatus"]
      )}</h3>`;
      previousOrders();
      itemsCountReset();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//previously selected items were resetted to 0
function itemsCountReset() {
  var itemsList = document.querySelectorAll(".item-count");
  for (let index = 0; index < itemsList.length; index++) {
    itemsList[index].innerHTML = "0";
  }
  // order={}
  for (element in order) {
    delete order[element];
  }
}

function setPreviousOrders(result) {
  var divBody = document.querySelector(".prev-orders");
  divBody.innerHTML = "";

  for (let index = 0; index < result.length; index++) {
    var order = result[index];
    var fetchDiv = document.querySelector(".prev-orders").innerHTML;
    /*   {
      order_id: '2023-03-29T12:59:43T2',
      customer_name: 'Abhiram',
      table_num: 2,
      order_date: '2023-03-29',
      order_time: '12:59:43',
      order_items: {
        'Rumali Roti': { time: 10, count: 2, price: 30 },
        'Veg Biryani': { time: 20, count: 2, price: 420 }
      }
    } */

    var orderTime = 0;
    var orderItems = order["order_items"];
    var orderId = order["order_id"];
    var orderStatus = order["order_status"];
    var paymentStatus = order["payment_status"];
    var orderTotal = 0;

    var itemsList = "";
    for (let [itemName, itemQuantity] of Object.entries(orderItems)) {
      var itemTime = parseInt(itemQuantity["time"]);
      var itemPrice = parseInt(itemQuantity["price"]);
      orderTime = Math.max(orderTime, itemTime);
      itemsList += `<p>${itemQuantity["count"]} x ${itemName} == ${itemPrice}</p>`;
      orderTotal += itemPrice;
    }

    var update = `<div class="container  order-box">
    <h1 id=${orderId + "time"} class="order-time">${orderTime}mins</h1>
    <h4 class="items-list">Order Items:</h4>
    ${itemsList} 
    <h5>Order Total == Rs.${orderTotal}</h5>
    <h4 class="status">Order Status:</h4>
    <p>${orderStatus}</p>
    <h4 class="status">Payment Status:</h4>
    <p>${paymentStatus}</p>`;
    if (paymentStatus != "Payment Done...") {
      update += `<a type="button" id=${orderId} style="margin:2%;" class="payment-btn btn btn-success">Pay</a>`;
    }

    if (orderStatus != "Order Received...") {
      update += `<a type="button" name=${orderId} class="received-btn btn btn-success">Order recieved</a>`;
    }

    update += `</div>`;
    divBody.innerHTML = fetchDiv + update;
    TimerIds.add(orderId + "time");
  }

  $(".payment-btn").on("click", function (event) {
    var order_id = event.target.id;
    updatePaymentStatus(order_id);
  });

  $(".received-btn").on("click", function (event) {
    var order_id = event.target.name;
    updateOrderStatus(order_id);
  });
}

function updateOrderStatus(order_id) {
  let sendId = fetch(`http://${localhost}:${port}/updateOrderStatus`, {
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order_id: order_id }),
  })
    .then((response) => response.json())
    .then((result) => {
      previousOrders();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  previousOrders();
}

function updatePaymentStatus(order_id) {
  let sendId = fetch(`http://${localhost}:${port}/updatePaymentStatus`, {
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order_id: order_id }),
  })
    .then((response) => response.json())
    .then((result) => {
      previousOrders();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  previousOrders();
}

function previousOrders() {
  fetch(`http://${localhost}:${port}/ordersPlaced`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: userName, tableNumber: tableNumber }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("data", result);

      setPreviousOrders(result);
    })
    .catch((error) => {
      // console.error("Error:", error);
    });
}

// let flag = 1;
setInterval(() => {
  previousOrders();
//   if (flag == 1) {
//   Array.from(TimerIds).forEach((id) => {
  
//       let time = document.getElementById(id).innerText;
//       let timeInMins = parseInt(time.split("mins")[0]);
//       let seconds = 60;
//      const TimerId= setInterval(() => {
//         if(seconds==0){
//           timeInMins--;
//           seconds=60;
//         }
//         console.log(`${timeInMins}:${seconds}`)
//         document.getElementById(id).innerHTML = `${timeInMins}:${seconds}`;

//         seconds--;
//       }, 1000);
//     //  console.log();
    
    
//   });
//   flag=0;
// }
}, 2500);

/*
    <div class="col">
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="src/images/biryani.jpg" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Chicken Biryani</h5>
              <p class="card-text">Combination of chicken and rice with authentic indian spices.</p>
              <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
              <a type="button" class="btn btn-light">-</a>
              <a class="">2</a>
              <a type="button" class="btn btn-light">+</a>
            </div>
          </div>
    </div>
*/

/*
// Set the date we're counting down to
var countDownDate = new Date("Apr 4, 2023 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
   document.getElementById("demo").innerHTML =minutes + "m " + seconds + "s ";
  
   $(".order-time").each(function () {
     
    this.innerHTML=minutes + "m " + seconds + "s ";
});

   //  days + "d " + hours + "h "+ 
  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

*/
