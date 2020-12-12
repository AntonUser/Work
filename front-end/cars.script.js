async function query() {
    const result = await fetch('http://localhost:3001/get/getCars', {
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
            html += '<tr id ="tr' + element.id_car + '">' +
                '<td>' + element.id_car + '</td>' +
                '<td class ="mark">' + element.brand + '</td>' +
                '<td class ="mark">' + element.model + '</td>' +
                '<td class ="mark">' + element.vin_number + '</td>' +
                '<td class ="mark">' + element.iss_year + '</td>' +
                '<td class ="mark">' + element.carcass_type + '</td>' +
                '<td class ="mark">' + element.condition + '</td>' +
                '<td class ="mark">' + element.killometrage + '</td>' +
                '<td class ="mark">' + element.purchase_price + '</td>' +
                '<td class ="mark">' + element.color + '</td>' +
                '<td><button type="submit" id="button_remove' + element.id_car + '"' + ' value="' + element.id_car + '"' +
                '" class="btn btn-primary font" onClick="removeQuery(this)">Remove</button></td><td>' +
                '<input type="checkbox" id="check' + element.id_car + '"' + ' value="' + element.id_car + '"' + 'onclick="check(this)" hidden>' +
                '<label for="check' + element.id_car + '"' + '> Update</label ></td ></tr > '
        });
        $('#table').append(html);
    } else {
        alert('ne ok')
    }
}

async function removeQuery(objectBtn) {
    let body = { id: objectBtn.value };
    const result = await fetch('http://localhost:3001/drop/dropCar', {
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
    let brand = document.getElementById('bra').value;
    let model = document.getElementById('mod').value;
    let vin = document.getElementById('vin').value;
    let iss = document.getElementById('iss').value;
    let carcas = document.getElementById('carcas').value;
    let condition = document.getElementById('con').value;
    let killometrage = document.getElementById('kil').value;
    let purPrice = document.getElementById('pur').value;
    let color = document.getElementById('col').value;
    let body = {
        idCar: id,
        Brand: brand,
        Model: model,
        vinNumber: vin,
        issYear: iss,
        carcassType: carcas,
        Condition: condition,
        Killometrage: killometrage,
        purchasePrice: purPrice,
        Color: color
    };
    const response = await fetch('http://localhost:3001/add/addCar', {
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
        let brand = $(row).find("td").eq(1).html();
        let model = $(row).find("td").eq(2).html();
        let vin = $(row).find("td").eq(3).html();
        let iss = $(row).find("td").eq(4).html();
        let carcas = $(row).find("td").eq(5).html();
        let condition = $(row).find("td").eq(6).html();
        let killometrage = $(row).find("td").eq(7).html();
        let purPrice = $(row).find("td").eq(8).html();
        let color = $(row).find("td").eq(9).html();
        let id = $(row).find("td").eq(0).html();

        let body = {
            Brand: brand,
            Model: model,
            vinNumber: vin,
            issYear: iss,
            carcassType: carcas,
            Condition: condition,
            Killometrage: killometrage,
            purchasePrice: purPrice,
            Color: color,
            id: id
        };
        const response = await fetch('http://localhost:3001/update/updateCar', {
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