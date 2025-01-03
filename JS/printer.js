// Submit file
function submitFile() {
    var submit = document.getElementById('submit');
    var input = document.createElement('input');
    if (localStorage.getItem(localStorage.getItem('loggedUser') + '_fileUploaded')) {
        printFile();
        return;
    }
    input.type = 'file';
    input.onchange = function(event) {
        var file = event.target.files[0];
        var fileName = file.name;
        var fileType = file.type;
        if (fileType.startsWith('image/') || fileType.startsWith('application/pdf')) {
            localStorage.setItem(localStorage.getItem('loggedUser') + '_fileUploaded', fileName);
            updatePage();
        } else {
            alert('Invalid file type. Please select an image or a PDF document.');
        }
    }
    input.click();
}

// Update Page
function updatePage() {
    var header = document.getElementById('header');
    var cloud = document.getElementById('cloud');
    var submit = document.getElementById('submit');
    var deleteBtn = document.getElementById('delete');
    var copiesDiv = document.getElementById('copies-div');
    var copies = document.getElementById('copies');

    if (!localStorage.getItem(localStorage.getItem('loggedUser') + '_fileUploaded')){
        header.textContent = 'Ficheiros';
        cloud.style.display = 'block';
        submit.textContent = 'Submeter Ficheiro';
        deleteBtn.style.display = 'none';
        copiesDiv.style.display = 'none';
    } else {
        header.textContent = localStorage.getItem(localStorage.getItem('loggedUser') + '_fileUploaded');
        cloud.style.display = 'none';
        submit.textContent = 'Enviar para a impressora';
        deleteBtn.style.display = 'flex';
        copiesDiv.style.display = 'block';
        copies.value = 1;
    }
};

// Send file to printer
function printFile() {
    alert("A imprimir " + document.getElementById('copies').value + " cópia(s) de " + localStorage.getItem(localStorage.getItem('loggedUser') + '_fileUploaded'));
    localStorage.removeItem(localStorage.getItem('loggedUser') + '_fileUploaded');
    updatePage();
}

// Remove file
function removeFile() {
    localStorage.removeItem(localStorage.getItem('loggedUser') + '_fileUploaded');
    updatePage();
}