(function() {
'use strict';

// assign the reference of the element with ID "template" to var templateRow
// this element is used to create new rows in the table
var templateRow = document.getElementById('template');

// the reference to el with ID "tableBody" -
// the body of the table where the new rows will be inserted
var tableBody = document.getElementById('tableBody');

// the reference to the data in Firebase
// note that it is the same as was used to save answers to
var dataRef = new Firebase('https://gempoll.firebaseio.com/answers');

// this function will be called when new answer is added
// it is also called when the page is opened - once for each existing row
dataRef.on('child_added', function (snapshot) {
    // get data of the row to var "item"
    var item = snapshot.val();

    // logs to browser console, can be removed
    // console.log(item);

    // call function "addRow" to add new row using the data
    addRow(item);
});


// this function creates new table row, populates it with the data from the database
// and inserts the new row into the end of the table
function addRow(item) {
    // cleate copy of our template row (true parameter instructs the browser to copy children too)
    var row = templateRow.cloneNode(true);

    // remove id attibute from the copy - only one element can have a certain ID
    row.removeAttribute('id');

    // make row visible, as template is invisible (see style="display: none" in HTML)
    // note, that at this point you can't see the new row yet, as it is not added to the table,
    // it exists only in browser memory
    row.style.display = '';

    // iterate properties of the data object
    // each property name will be sequentially assigned to variable "prop"
    for (var prop in item) {
        // reference to the field in the new row. "data" attribute in HTML is used to identify the fields
        var field = row.querySelector('[data=' + prop + ']');

        // set contents of the field to the data
        field.innerHTML = item[prop];
    }

    // add the new row to the table
    tableBody.appendChild(row);
}

})();
