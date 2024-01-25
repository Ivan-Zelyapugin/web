$(document).ready(function() {
    // Получаем ссылки на все формы
    const glav_form = document.querySelector("#glav-form");
    const transform_form = document.querySelector("#transform-form");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    const nomer = localStorage.getItem("nomer");
    
    
    
    $.getJSON('../../Back/php/JSON_add_application.json', function(data) {
        const name = document.querySelector("#transform_name");
        const phone = document.querySelector("#transform_phone");
        const city = document.querySelector("#transform_city");
        const zag = document.querySelector("#transform_zag");
        const text = document.querySelector("#transform_text");
        var matchingObjects = [];
        $.each(data, function(index, obj) {
            if (obj.email === email) {
                
                matchingObjects.push(obj);             
            }
        });
        let n=0;
        $.each(matchingObjects, function(index, obj) {
            n++;
            
            if (parseInt(n) === parseInt(nomer)) {
                name.value=obj.name;
                phone.value=obj.phone;
                city.value=obj.city;
                zag.value=obj.zag;
                text.value=obj.text;
            }
        });
    });
    
       
    $('#transform-form').submit(function (e) {
        e.preventDefault();
        let jsonData = getJSON($(this).serializeArray(), {'email': email,'nomer': nomer}); 
        $.ajax({
            url: '../../Back/php/transform.php',
            type: 'POST',
            contentType: 'application/json',
            data: jsonData,
            success: async function (jsonResult) { 
                let result = JSON.parse(jsonResult);
                
                let errorName = $('#transform_name_e');
                errorName.html(result.mesI);
                
                let zag_error = $('#transform_zag_e');
                zag_error.html(result.mesZ);
                
                let errorApp = $('#transform_errorApp');
                errorApp.html(result.mes);
                
                let text_e = $('#transform_text_e');
                text_e.html(result.mesT);
                
                let phone_e = $('#transform_phone_e');
                phone_e.html(result.mesTel);
                
                if(result.mes==='' && result.mesI==='' && result.mesZ==='' && result.mesT===''){
                    location.reload();
                    glav_form.style.display = "block";
                    transform_form.style.display = "none";
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


