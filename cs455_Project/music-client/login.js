window.onload = function () {
    document.getElementById('button_login').onclick = login;

}

async function login(event) {
    event.preventDefault();
    const username = document.getElementById('user_name').value;
    const password = document.getElementById('user_password').value;
    //Then make a request to serverside
    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });
    // if response.ok is true then it will give accessToken
    if (response.ok) {
        const result = await response.json();
        // console.log(result.accessToken);
        sessionStorage.setItem("accessToken",result.accessToken);
        sessionStorage.setItem("username",result.username);
        location.href ="welcomepage/welcome.html"

    } else{
        document.getElementById("errormsg").innerHTML = "* Incorrect Username or Password";
    }
}
