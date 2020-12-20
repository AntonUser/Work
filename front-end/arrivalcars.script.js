async function query() {
    const result = await fetch('http://localhost:3001/get/getArrivalCars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null
    });
    if (result.ok) {
        let json = await result.json();
        var html = '';
        json.forEach(element => {
            let date = new Date(element.add_date);
            let dateString = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();
            html += '<tr id ="tr' + element.id + '">' +
                '<td>' + element.id + '</td>' +
                '<td class ="mark">' + element.id_employee + '</td>' +
                '<td class ="mark">' + dateString + '</td>' +
                '<td class ="mark">' + element.id_car + '</td>' +
                '<td><button type="submit" id="button_remove' + element.id + '"' + ' value="' + element.id + '"' +
                '" class="btn btn-primary font" onClick="removeQuery(this)">Remove</button></td><td>' +
                '<input type="checkbox" id="check' + element.id + '"' + ' value="' + element.id + '"' + 'onclick="check(this)" hidden>' +
                '<label for="check' + element.id + '"' + '> Update</label ></td ></tr > '
        });
        $('#table').append(html);
    } else {
        alert('ne ok')
    }
}

async function removeQuery(objectBtn) {
    let body = { id: objectBtn.value };
    const result = await fetch('http://localhost:3001/drop/dropArrivalCars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    if (result.ok) {
        $('table').children('tr:not(:first)').remove();
        query();
    } else {
        alert('remove fail')
    }
}

async function insert() {
    let id = document.getElementById('key').value;
    let idEmployee = document.getElementById('ide').value;
    let addDate = document.getElementById('add').value;
    let idCar = document.getElementById('idc').value;
    let body = {
        id: id,
        idEmployee: idEmployee,
        addDate: addDate,
        idCar: idCar
    };
    const response = await fetch('http://localhost:3001/add/addArrivalCars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    if (response.ok) {
        $('table').children('tr:not(:first)').remove();
        query();
        alert('entry added successfully');

    } else {
        alert('error');
    }
}

async function check(objectCheck) {
    if ($(document.getElementById('check' + objectCheck.value)).is(':checked')) {
        edit(objectCheck);
    } else {
        var row = document.getElementById('tr' + objectCheck.value);
        var idEmployee = $(row).find("td").eq(1).html();
        var addDate = $(row).find("td").eq(2).html();
        var idCar = $(row).find("td").eq(3).html();
        var id = $(row).find("td").eq(0).html();
        var date = addDate.substr(6) + "-" + addDate.substr(3, 2) + "-" + addDate.substr(0, 2);//переделываем даты под нужный формат
        alert(date)
        let body = {
            idEmployee: idEmployee,
            addDate: date,
            idCar: idCar,
            id: id
        };
        const response = await fetch('http://localhost:3001/update/updateArrivalCars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (response.ok) {
            alert('Entry successfully updated')
        } else {
            alert('update error')
        }
    }
}

function edit(objectCheck) {
    var container = document.querySelector("#tr" + objectCheck.value);
    var tds = container.querySelectorAll("td.mark");
    for (var i = 0; i < tds.length; i++) {
        tds[i].addEventListener('click', function func() {
            var input = document.createElement('input');
            input.value = this.innerHTML;
            this.innerHTML = '';
            this.appendChild(input);

            var td = this;
            input.addEventListener('blur', function () {
                td.innerHTML = this.value;
            });
            this.removeEventListener('click', func);
        });
    }
}