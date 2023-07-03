var form=document.getElementById('form')

form.addEventListener('submit',function (event) {
    // event.preventDefault()
    console.log(event)
    var username=document.getElementById('username').value;
    var tableNumber=document.getElementById('table_no').value;
    localStorage.setItem('username', username);
    localStorage.setItem('tableNumber', tableNumber);
   // console.log(typeof(username))
})
