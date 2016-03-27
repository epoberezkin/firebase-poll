(function() {
'use strict';

var templateRow = document.getElementById('template');
var tableBody = document.getElementById('tableBody');

var dataRef = new Firebase('https://gempoll.firebaseio.com/answers');
dataRef.on('child_added', function (snapshot) {
    var item = snapshot.val();
    console.log(item);
    addRow(item);
});


function addRow(item) {
    var row = templateRow.cloneNode(true);
    row.style.display = '';
    row.removeAttribute('id');
    for (var prop in item) {
        var field = row.querySelector('[data=' + prop + ']');
        field.innerHTML = item[prop];
    }
    tableBody.appendChild(row);
}

})();
