$(document).ready(function() {
    // Получаем ссылки на все формы
    const glav_form = document.querySelector("#glav-form");
    const add_form = document.querySelector("#add-form");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    $('#add-form').submit(function (e) {
        e.preventDefault();
        let jsonData = getJSON($(this).serializeArray(), {'email': email}); 
        $.ajax({
            url: '../../Back/php/app.php',
            type: 'POST',
            contentType: 'application/json',
            data: jsonData,
            success: async function (jsonResult) {
                let result = JSON.parse(jsonResult);
                console.log(result);
                
                let errorName = $('#name_e');
                errorName.html(result.mesI);
                
                let zag_error = $('#zag_e');
                zag_error.html(result.mesZ);
                
                let errorApp = $('#errorApp');
                errorApp.html(result.mes);
                
                let text_e = $('#text_e');
                text_e.html(result.mesT);
                
                let phone_e = $('#phone_e');
                phone_e.html(result.mesTel);
                
                if(result.mes==='' && result.mesI==='' && result.mesZ==='' && result.mesT===''){
                    location.reload();
                    glav_form.style.display = "block";
                    add_form.style.display = "none";
                }
            }
        });
    });
    
    function getJSON(data, extraFields){
        let object = {};
        $.each(data, function (index, field) {
            object[field['name']] = field['value'];
        });
        $.each(extraFields, function (key, value) {
            object[key] = value;
        });
        return JSON.stringify(object);
    }
});