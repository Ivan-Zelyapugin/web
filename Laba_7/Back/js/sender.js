$(document).ready(function() {  
    $('#register-form').submit(function (e) {
        e.preventDefault();
        let jsonData = getJSON($(this).serializeArray());
        $.ajax({
            url: 'Back/php/register.php',
            type: 'POST',
            contentType: 'application/json',
            data: jsonData,
            success: async function (jsonResult) {
                let result = JSON.parse(jsonResult);
                let email = $('#email-message');
                email.html(result.messageEmail);
                let password = $('#password-message');
                password.html(result.messagePassword);
                let alert = $('#result');
                alert.html(result.message);
                console.log(result.mdate);
                let mesdate = $('#medate');
                mesdate.html(result.mdate);
            }
        });
    });       
    function getJSON(data){
        let object = {};
        $.each(data, function (index, field) {
            object[field['name']] = field['value'];
        });
        return JSON.stringify(object);
    }  
    const loginButton = document.querySelector("#login-button-2");
    const registerForm = document.querySelector("#register-form");
    const loginForm = document.querySelector("#login-form");
    
    loginButton.addEventListener("click", () => {
        // Показываем только форму входа
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    });
});