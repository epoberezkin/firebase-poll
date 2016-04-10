(function() {
'use strict';

// assign the reference to the element with ID questions to variable form
var form = document.getElementById('questions');

// subscribe to form submission event
form.onsubmit = function(e) {
    // prevent default submission (it would send data to the server and reload the page)
    e.preventDefault();

    // collect data from form fields - see getData function
    var data = getData();

    // reference to Firebase database
    var dataRef = new Firebase('https://gempoll.firebaseio.com/answers');

    // add answer to the database
    dataRef.push(data, function() {
        // once the data is saved, show the message
        window.alert('Form submitted');
    });
};


// this function collects data from the form
function getData() {
    // variable data with empty object
    var data = {};

    // assign array of elements inside form that are input or textarea to variable inputs
    var inputs = form.querySelectorAll('input, textarea');

    // iterate over all inputs
    for (var i=0; i<inputs.length; i++) {
        // in each iteration, assign input to variable el
        var el = inputs[i];

        switch (el.type) {
            // el.type is "radio" (radio buttons)
            case 'radio':
                // if element is checked assign its value (defined in HTML)
                // to the property of data object, name of the property is defined in HTML
                if (el.checked) data[el.name] = el.value;

                // break exts switch operator, without it the next case would be executed as well
                break;
            case 'text':
            default:
                // if el.type is text (normal input) or if it is textarea assign its value (entered by user)
                // to the property of data object, name of the property is defined in HTML
                data[el.name] = el.value;
                break;
        }
    }

    // return collected data to the code that called the function (see above)
    return data;
}

})();
