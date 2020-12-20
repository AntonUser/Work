async function query() {
    const result = await fetch('http://localhost:3001/get/getSales', {
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
            let date = new Date(element.date_sales);
            let dateString = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();
            html += '<tr id ="tr' + element.id_sales + '">' +
                '<td>' + element.id_sales + '</td>' +
                '<td class ="mark">' + element.id_car + '</td>' +
                '<td class ="mark">' + dateString + '</td>' +
                '<td class ="mark">' + element.id_client + '</td>' +
                '<td class ="mark">' + element.id_employee + '</td>' +
                '<td class ="mark">' + element.sale_value + '</td>' +
                '<td><button type="submit" id="button_remove' + element.id_sales + '"' + ' value="' + element.id_sales + '"' +
                '" class="btn btn-primary font" onClick="removeQuery(this)">Remove</button></td><td>' +
                '<input type="checkbox" id="check' + element.id_sales + '"' + ' value="' + element.id_sales + '"' + 'onclick="check(this)" hidden>' +
                '<label for="check' + element.id_sales + '"' + '> Update</label ></td ></tr > '
        });
        $('#table').append(html);
    } else {
        alert('ne ok')
    }
}

async function insert() {
    let idSales = document.getElementById('key').value;
    let idCar = document.getElementById('idca').value;
    let dateSales = document.getElementById('dat').value;
    let idClient = document.getElementById('idcl').value;
    let idEmployee = document.getElementById('ide').value;
    let saleValue = document.getElementById('sal').value;
    let body = {
        idSales: idSales,
        idCar: idCar,
        dateSales: dateSales,
        idClient: idClient,
        idEmployee: idEmployee,
        saleValue: saleValue
    };
    const response = await fetch('http://localhost:3001/add/addSale', {
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

async function removeQuery(objectBtn) {
    let body = { id: objectBtn.value };
    const result = await fetch('http://localhost:3001/drop/dropSale', {
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

async function check(objectCheck) {
    if ($(document.getElementById('check' + objectCheck.value)).is(':checked')) {
        edit(objectCheck);
    } else {
        var row = document.getElementById('tr' + objectCheck.value);
        var idCar = $(row).find("td").eq(1).html();
        var dateSales = $(row).find("td").eq(2).html();
        var idClient = $(row).find("td").eq(3).html();
        var idEmployee = $(row).find("td").eq(4).html();
        var saleValue = $(row).find("td").eq(5).html();
        var id = $(row).find("td").eq(0).html();
        var date = dateSales.substr(6) + "-" + dateSales.substr(3, 2) + "-" + dateSales.substr(0, 2);//переделываем даты под нужный формат
        let body = {
            idCar: idCar,
            dateSales: date,
            idClient: idClient,
            idEmployee: idEmployee,
            saleValue: saleValue,
            id: id
        };
        const response = await fetch('http://localhost:3001/update/updateSale', {
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