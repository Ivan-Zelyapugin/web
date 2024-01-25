$(document).ready(function() {
    const queryString = window.location.search;
    const uParams = new URLSearchParams(queryString);
    const mail = uParams.get('email');
    const glav_form = document.querySelector("#glav-form");
    const transform_form = document.querySelector("#transform-form");
    const result = document.querySelector("#results");
    $.getJSON('../../Back/php/JSON_add_application.json', function(data) {
        var matchingObjects = [];
        $.each(data, function(index, obj) {
            if (obj.email === mail) {
                matchingObjects.push(obj);
            }
        });
        // Вывод данных в HTML
        if (matchingObjects.length > 0) {
            var nomer = 1; // Переменная для хранения номера заявки
            $.each(matchingObjects, function(index, obj) {
                var name = obj.name;
                var phone = obj.phone;
                var city = obj.city;
                var text = obj.text;
                var zag = obj.zag;
                const resultRow = `
                    <tr>
                        <td>${nomer}</td>
                        <td>${name}</td>
                        <td>${phone}</td>
                        <td>${city}</td>
                        <td>${zag}</td>
                        <td>${text}</td>
                    </tr>
                `;
                const row = document.createElement("tr");
                row.innerHTML = resultRow;
                
                const button = document.createElement("button");
                button.type = "button";
                button.className = "transform";
                button.id=nomer;              
                button.textContent = "Изменить заявку";
                
                const button_2 = document.createElement("button");
                button_2.type = "button";
                button_2.className = "delete";
                button_2.id=nomer;              
                button_2.textContent = "Удалить";
                
                button.addEventListener("click", function() {
                    const nomer = button.id;
                    localStorage.setItem("nomer", nomer);
                    glav_form.style.display = "none";
                    transform_form.style.display = "block";
                });
                
                button_2.addEventListener("click", function() {
                    const nomer_2 = button.id;
                    localStorage.setItem("nomer_2", nomer_2);
                    Del();
                });
                
                row.appendChild(button);
                result.appendChild(row);
                
                row.appendChild(button_2);
                result.appendChild(row);
                
                nomer++; // Увеличение значения счетчика на 1
            });
        }
    });
});
