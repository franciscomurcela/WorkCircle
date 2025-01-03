// Validate email format
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Submit a Ticket
function submitTicket() {
    var email = document.getElementById('email');
    var ticket = document.getElementById('ticket');

    if(email) {
        var email = email.value;
        if(validateEmail(email)) {
            if (ticket.value == '' || ticket.value == ticket.placeholder) {
                alert('Descreva o seu problema!');
            } else {
                ticket.value = "";
                window.location.reload();
            }
        } else alert('Email inválido!');
    } else alert('Insira o email!');
}