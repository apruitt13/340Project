// Citation for the CRUD operations: 
//  Date: 7/28/22
//  Adapted from:
//  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addTestScoreForm = document.getElementById("add-students-tests-ajax");

// Modify the objects we need
addTestScoreForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputIdStudent = document.getElementById("add-idStudent");
    let inputIdTest= document.getElementById("add-idTest");

    // Get the values from the form fields
    let idStudentValue = inputIdStudent.value;
    let idTestValue = inputIdTest.value;



    // Put our data we want to send in a javascript object
    let data = {
        idStudent: idStudentValue,
        idTest: idTestValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-students-tests-ajax", true);
    xhttp.addEventListener("error", e=>console.log(e))
    xhttp.onerror = function() { // only triggers if the request couldn't be made at all
        alert(`Network Error`);
      };
    xhttp.setRequestHeader("Content-type", "application/json");
    test = JSON.stringify(data)
    console.log(test)
    xhttp.send(test);
    
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputIdStudent.value = '';
            inputIdTest.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response


})


// Creates a single row from an Object representing a single record from 
// Students
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("studentsTests-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let idStudentCell = document.createElement("TD");
    let idTestCell = document.createElement("TD");


    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.idStudentsTests;
    idStudentCell.innerText = newRow.idStudent;
    idTestCell.innerText = newRow.idTest;

    
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteTest(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(idStudentCell);
    row.appendChild(idTestCell);


    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);
    
    // Add the row to the table
    currentTable.appendChild(row);


}

