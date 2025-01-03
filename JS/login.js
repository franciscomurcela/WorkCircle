//  Implement login system and add to localstorage the logged user

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

function togglePasswordVisibility() {
    var passwordField = document.getElementById('password');
    var toggleButton = document.getElementById('togglePassword');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.textContent = 'Hide';
    } else {
        passwordField.type = 'password';
        toggleButton.textContent = 'Show';
    }
}

function login() {
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    
    if (email) { // Check email field
        email = email.value;
        if (validateEmail(email)) { // Check if email is valid
            if (localStorage.getItem(email) != null) { // See if user exists
                if (JSON.parse(localStorage.getItem(email) == password.value)) { // See if password matches
                    localStorage.setItem('loggedUser', JSON.stringify(email));
                    window.location.href = "HTML/menu.html";
                } else { alert('Password errada!'); }
            } else { alert('Usuário não existe!'); }
        } else { alert('E-mail inválido!') }
    } else { alert('Insira o e-mail!') }
}
