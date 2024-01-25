$(document).ready(function() {  
    $('#login-form').submit(function (e) {
        e.preventDefault();
        let jsonData = getJSON($(this).serializeArray());
        $.ajax({
            url: 'Back/php/vxod.php',
            type: 'POST',
            contentType: 'application/json',
            data: jsonData,
            success: async function (jsonResult) {
                let result = JSON.parse(jsonResult);
                if (result.redirect_url) {
                    window.location.href = result.redirect_url;
                } else if (result.message) {
                    let errorMessage = $('#message');
                    errorMessage.html(result.message);
                }
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
    
    const registerbutton = document.querySelector("#register-button-2");
    const registerForm = document.querySelector("#register-form");
    const loginForm = document.querySelector("#login-form");
    
    registerbutton.addEventListener("click", () => {
        // Показываем только форму входа
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    });
});


