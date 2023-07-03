
var localhost="localhost"; //or your device ip address
var port=3000

function setDashboard(result) {

  var tBody=$('tbody');
  tBody.empty()
   for (let index = 0; index < result.length; index++) {
    var order=result[index]
    var fetchTable=$('tbody').innerHTML;
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


    var orderTime=0;
    var orderItems=order["order_items"];
    var orderId=order["order_id"];
    var orderStatus=order["order_status"]

    var itemsList='';
    for (let [itemName, itemQuantity] of Object.entries(orderItems)) {
        var itemTime=parseInt(itemQuantity["time"]);
        orderTime=Math.max(orderTime,itemTime);

        itemsList+=`<p>${itemQuantity["count"]} x ${itemName}</p>`

      //  console.log(itemName,itemQuantity["count"],orderTime,itemsList);
    }
   
    var update=`<tr>
    <th scope="row">${order["table_num"]}</th>
    <td>${itemsList}</td>
    <td id="${orderId}-time">
    ${orderTime}
    </td>
    <td>
    <p>${orderStatus}</p>`;

    if(orderStatus=='Food is being prepared...'){
      update+=`<button type="button" id=${orderId} class="btn btn-success order-finish">Order finished</button>`;
    }
    update+=`</td>
   </tr>`;
   tBody.append(update)
  
}
$(".order-finish").on("click",function (event) {
    var order_id=event.target.id
    updateOrders(order_id)
    })
}



function updateOrders(order_id) {
let sendId= fetch(`http://${localhost}:${port}/ordersUpdate`, {
  method: "PUT", // or 'PUT'
  headers: {
    "Content-Type": "application/json",
  },body:JSON.stringify({order_id:order_id}),
  }).then((response) => response.json()).then((result) => {
   console.log("data",result)
   getAllOrders()
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  getAllOrders()
}


function getAllOrders() {
  

fetch(`http://${localhost}:${port}/allPaidOrders`, {
  method: "GET", // or 'PUT'
  headers: {
    "Content-Type": "application/json",
  }
}).then((response) => response.json()).then((result) => {
   console.log("data",result)
    setDashboard(result)
  }).catch((error) => {
    // console.error("Error:", error);
  });

}

setInterval(() => {
  getAllOrders() 
}, 2500);


