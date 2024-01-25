$(document).ready(function() {

});
function Del(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    const nomer_2 = localStorage.getItem("nomer_2");
    let jsonData = getJSON({'email': email,'nomer': nomer_2}); 
    $.ajax({
        url: '../../Back/php/delete.php',
        type: 'POST',
        contentType: 'application/json',
        data: jsonData,
        success: async function (jsonResult){
            alert("Заявка успешно удалена");
            location.reload();
        }
    });
}

function getJSON(extraFields){
    let object = {};
    $.each(extraFields, function (key, value) {
        object[key] = value;
    });
    return JSON.stringify(object);
}