"use strict";

window.onload = onloadHandler;

function onloadHandler() {

    let buttonRef = document.querySelector("#signIn");
    buttonRef.onclick = signInClick;
}
function signInClick(event) {
    event.preventDefault();

    const userNameRef = document.getElementsByName("uname")[0];
    const pswRef = document.getElementsByName("psw")[0];

    // const p =document.createElement('p');
    // p.innerHTML = "testing does this work?"
    // document.body.append(p);

    if ((userNameRef.value === "admin") && (pswRef.value === "admin")) {
        window.location.href = "/customer/index-customer.html";
        userNameRef.classList.remove('error-input');
    }
    else if ((userNameRef.value === "manager") && (pswRef.value === "manager")){
        window.location.href = "/Inventory/index-inventory.html";
        userNameRef.classList.remove('error-input');
    }
    else {
        // debugger;

        userNameRef.classList.add('error-input');
    }
}



