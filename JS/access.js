function getTemp() {

    if(localStorage.getItem('temp' + JSON.parse(localStorage.getItem('toReserve'))) == null) 
        localStorage.setItem('temp' + JSON.parse(localStorage.getItem('toReserve')), JSON.stringify(20));

    document.getElementById('temp').innerHTML = JSON.parse(localStorage.getItem('temp' + JSON.parse(localStorage.getItem('toReserve')))) + 'º';

}

function changeTemp(increment) {
    // Get current temperature
    var temp = parseInt(document.getElementById('temp').innerHTML);

    // If temp is under it's limits then change it
    if(temp > 0 && temp < 30) {
        localStorage.setItem('temp' + localStorage.getItem('toReserve'), JSON.stringify(temp + parseInt(increment)));
    }

    // If not only change based on it's limits
    else if (parseInt(increment) < 0 && temp == 30) 
        localStorage.setItem('temp' + localStorage.getItem('toReserve'), JSON.stringify(temp + parseInt(increment)));

    else if (parseInt(increment) > 0 && temp == 0)
        localStorage.setItem('temp' + localStorage.getItem('toReserve'), JSON.stringify(temp + parseInt(increment)));
    
    //Send temperature update
    getTemp();
}

function getResources() {
    var userResources = JSON.parse(localStorage.getItem(localStorage.getItem("loggedUser")));

    if(userResources == null) return

    //var menu = document.getElementById("menu").innerHTML;
    var top = 150;

    // Show every resource the user OWNS (different if he has access)
    // userResources is an array with the resources' ids
    for(var i = 0; i < userResources.length; i++) {
        // If resource is a room
        if(userResources[i] > 100) 
            document.getElementById("menu").innerHTML += '<div onclick="resource(' + userResources[i] + ')" style="width: 320px; height: 100px; left: 57px; top: ' + top  + 'px; position: absolute; background: #EFE3C2; border-radius: 40px">' + 
                ' <div class="resource" style="color: black; font-size: 17px; font-family: Verdana, Geneva, Tahoma, sans-serif; font-weight: 800; word-wrap: break-word; position: relative; top: 50%; transform: translateY(-50%); text-align: center;">Sala ' + userResources[i] + '</div>' +
                ' </div>';

        else 
            document.getElementById("menu").innerHTML += '<div onclick="resource(' + userResources[i] + ')" style="width: 320px; height: 100px; left: 57px; top: ' + top  + 'px; position: absolute; background: #EFE3C2; border-radius: 40px">' + 
                ' <div class="resource" style="color: black; font-size: 17px; font-family: Verdana, Geneva, Tahoma, sans-serif; font-weight: 800; word-wrap: break-word; position: relative; top: 50%; transform: translateY(-50%); text-align: center;">Impressora ' + userResources[i] + '</div>' +
                ' </div>';

        top += 150;

    }
}

function resource(resource) {
    localStorage.setItem('toReserve', JSON.stringify(resource));
    if (resource > 100)
        window.location.href = '../HTML/temperature.html';
    else 
        window.location.href = '../HTML/printer.html';
}

function endReservation() {
    window.location.href = '../HTML/payment.html';
}
