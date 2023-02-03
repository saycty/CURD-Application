
//validate the input before add
function validateForm() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    if (name == "") {
        alert("name is must");
        return false;
    }

    if (age == "") {
        alert("age is must");
        return false;
    }
    else if (age < 1) {
        alert("age must not be 0 or nonzero");
        return false;
    }
    if (address == "") {
        alert("address is must");
        return false;
    }
    if (email == "") {
        alert("email is must");
        return false;
    }
    else if (!email.includes("@")) {
        alert("envalid email");
        return false; 
    }
    return true;
}


// show data
function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    var html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="deleteData(' +
            index +
            ')"class="btn btn-primary" > Delete</button ><button onclick="UpdateData(' +
            index +
            ')"class="btn btn-primary m-2"> edit</button ></td> ';
        html += "</tr>";
        
    });



    document.querySelector("#crudTable tbody").innerHTML = html;
}


//load all data when page reload
document.onload = showData();


//add data

function AddData() {
    if (validateForm() == true) {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;


        var peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        }
        else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }



        peopleList.push({
            name: name,
            age: age,
            address: address,
            email: email,
        });
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
    }
}
//to delete data

function deleteData(index) {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }


    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

//update data

function UpdateData(index) {

    //jab edit me jayega tab add data jaa ke submit ayega
    
    document.getElementById("Submit").style.display= "none";
    document.getElementById("Update").style.display= "block";
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;


    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].email = document.getElementById("email").value;


            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();


            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";



            document.getElementById("Submit").style.display = "none";
            document.getElementById("Update").style.display = "block";

        }
    }
}