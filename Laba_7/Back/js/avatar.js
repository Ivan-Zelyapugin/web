$(document).ready(function() {
    const avatar = document.querySelector("#avatar");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    
    avatar.addEventListener('change', (event) => {
        const file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            var imageUrl = event.target.result;
            reader.readAsDataURL(file); // Чтение содержимого файла в формате Data URL
            let jsonData = getJSON({'email': email, 'address': imageUrl});
            $.ajax({
                url: '../../Back/php/avatar.php',
                type: 'POST',
                contentType: 'application/json',
                data: jsonData,
                success: async function(jsonResult) {
                    location.reload(); // Перезагрузка страницы после успешного запроса
                }
            });
        };
    });
});

function getJSON(extraFields) {
    return JSON.stringify(Object.assign({}, extraFields));
}


