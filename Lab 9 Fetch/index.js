window.onload = function () {
    //Fetch can be created here or we can create method    
    fetchEmployee();
    document.getElementById("ref").onclick = fetchEmployee;
}

async function fetchEmployee() {
    //fetch will give promise
    let result = await fetch('https://randomuser.me/api/?results=5');
    let emps = await result.json();
    // console.log(emps.results);
    renderEmployees(emps.results);

}

function renderEmployees(emps) {
    for (let i = 0; i < emps.length; i++) {
        let emp = emps[i];
        let fullname = emp.name.first + " " + emp.name.last;
        // console.log(emp.gender);
        // console.log(emp.name.first +" "+ emp.name.last);
        // console.log(emp.email);
        // console.log(emp.picture.large);
        document.getElementById('img' + i).src = emp.picture.large;
        document.getElementById('name' + i).textContent = fullname;
        document.getElementById('gender' + i).textContent = 'Gender:' + emp.gender;
        document.getElementById('email' + i).textContent = emp.email;
    }
}
