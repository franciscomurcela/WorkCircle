function reserve(id) {
    var resource = JSON.parse(localStorage.getItem(id));

    if(resource == null || resource.available == 1) {
        localStorage.setItem('toReserve', JSON.stringify(id));
        if (id > 100) 
            window.location.href = '../HTML/reserve_room.html';
        else 
            window.location.href = '../HTML/reserve_printer.html';
    }

    else {
        alert('Recurso indisponível!')
    }
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


function makeReservation() {
    var email = document.getElementById('email');
    var resource = JSON.parse(window.localStorage.getItem('toReserve'));

    // Check if email is valid
    if (email && email.value) {
        if (validateEmail(email.value)) {
            // Get user's resources and append new resource
            var existingEntries = JSON.parse(localStorage.getItem(localStorage.getItem('loggedUser')));

            // If user doesn't have resources yet, create new array
            if(existingEntries == null) existingEntries = [];
            
            var entry = resource;
            localStorage.setItem("entry", JSON.stringify(entry));

            // Save all resources back to local storage
            existingEntries.push(entry);
            localStorage.setItem(localStorage.getItem('loggedUser'), JSON.stringify(existingEntries));

            // add user to the resource
            window.localStorage.setItem(resource, JSON.stringify({'user' : email.value, 'available' : 0}));
            
            if(resource > 100)
                window.location.href = '../HTML/temperature.html';
            else
                window.location.href = '../HTML/printer.html';
        }
        else 
            alert('Email inválido!');
    }
    else 
        alert('Insira o email!');
}

function getResourceName() {
    var resource = JSON.parse(localStorage.getItem('toReserve'));
    console.log(resource);

    if(resource > 100) 
        return "Sala - " + resource;

    else 
        return "Impressora - " + resource;
}

function endReservation() {
    // Get resource in question
    var resource = JSON.parse(localStorage.getItem('toReserve'));

    // Clear resource
    localStorage.setItem(resource, JSON.stringify({"user" : "", "available" : 1}));

    // Remove resource from user
    var resources = JSON.parse(localStorage.getItem(localStorage.getItem('loggedUser')));

    for(var i = 0; i < resources.length; i++) {
        if ( resources[i] == resource) {
            resources.splice(i, 1);
        }
    }

    //Update localstorage
    localStorage.setItem(localStorage.getItem('loggedUser'), JSON.stringify(resources));

    //Redirect to initial page
    window.location.href = '../HTML/resource_access.html';
}