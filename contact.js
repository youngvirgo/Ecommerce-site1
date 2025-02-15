let body = document.querySelector("body");
let products = document.querySelector(".products");
let favcartContainer = document.querySelector(".favcartContainer");
let closeCart = document.querySelector(".close");
let cartnumcon = document.querySelector(".cartnumcon");
let productList = document.querySelector(".productlist");
let searchlist = document.querySelector(".searchlist");
let total = document.querySelector(".total");
let Clearcart = document.querySelector(".Clearcart");
let searchBar = document.querySelector("#searchBar");
let searchDisplay = document.querySelector(".searchdisplay");
let Totalamount = document.querySelector(".Amount");

let checkoutList = [];
let searchuser = [];


favcartContainer.addEventListener("click",function showcart() {
    body.classList.add("active");
})

closeCart.addEventListener("click",function showcart() {
    body.classList.remove("active");
})

function searchData(searchResults) {
    searchlist.innerHTML = "";
    searchResults.forEach((item, key) => {
        let li = document.createElement("li");
        li.innerHTML = `
        <img src="images/${item.image}">
        <div>${item.Name}</div>
        <div>${item.price}</div>
        <button onclick="Addtocart(${key})"><i class="fa-solid fa-cart-shopping fa-xxl" style="color: #161718;"></i>Add To Cart</button>
        `;
        searchlist.appendChild(li);
    });
}

function Addtocart(id) {
    
    if (checkoutList[id] == null) {
        checkoutList[id] = productsData[id];
        checkoutList[id].cartnumcon = 1;
        alert("Item added to cart");
    }
    else{
        checkoutList[id].cartnumcon += 1;
    }
    
  reloadCart()  
}

function reloadCart() {
    productList.innerHTML = "" ;
    let count = 0;
    let totalprice = 0;


    checkoutList.forEach((item, key) => {
        let li = document.createElement("li");
        totalprice+=parseInt(item.price*item.cartnumcon);
        count += item.cartnumcon;
        li.innerHTML = `
        <img src="images/${item.image}">
        <div>${item.Name}</div>
        <div>${item.price}</div>
        <div>
        <button onclick="changeQuantity(${key},${item.cartnumcon-1})">-</button>
        <div>${item.cartnumcon}</div>
        <button onclick="changeQuantity(${key},${item.cartnumcon+1})">+</button>
        </div>
        `;
        productList.appendChild(li);
    }); 

    total.innerHTML = `<span>Checkout (${count} items)₦ ${totalprice}</span>`;
    
    cartnumcon.innerHTML = count;  
    Totalamount.innerHTML = `<span>₦ ${totalprice}</span>`;
}



function changeQuantity(key, cartnumcon) {
    if (cartnumcon == 0) {
        delete checkoutList[key];
    }
    else{
        checkoutList[key].cartnumcon=cartnumcon;
    }
    reloadCart();
}

searchBar.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();
    searchuser = productsData.filter(function (item) {
        return item.Name.toLowerCase().includes(value);
    });
    searchData(searchuser);
    searchDisplay.style.display = value ? "block" : "none"; 
});


function Checkout() {
    window.location.href = "/checkout.html";
}
document.querySelector(".ham").addEventListener("click",function () {
    document.querySelector(".dropdownContent").style.display = "block";
    document.querySelector(".ham").style.display = "none";
})
document.querySelector(".close").addEventListener("click",function () {
    document.querySelector(".dropdownContent").style.display = "none";
    document.querySelector(".ham").style.display = "block";
})