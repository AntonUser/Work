
async function query() {
    const result = await fetch('http://localhost:3001/get/getClients', {
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
            html += '<tr id ="tr' + element.id_client + '"><td>' + element.id_client + '</td><td class ="mark">' + element.first_name +
                '</td><td class ="mark">' + element.patronymic + '</td><td class ="mark">' + element.lastname + '</td><td>' +
                '<button type="submit" id="button_remove' + element.id_client + '"' + ' value="' + element.id_client + '"' +
                '" class="btn btn-primary font" onClick="removeQuery(this)">Remove</button></td><td>' +
                '<input type="checkbox" id="check' + element.id_client + '"' + ' value="' + element.id_client + '"' + 'onclick="check(this)" hidden>' +
                '<label for="check' + element.id_client + '"' + '> Update</label ></td ></tr > '
        });
        $('#table').append(html);
    } else {
        alert('ne ok')
    }
}

async function removeQuery(objectBtn) {
    let body = { id: objectBtn.value };
    const result = await fetch('http://localhost:3001/drop/dropClient', {
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
    let firstName = document.getElementById('fn').value;
    let lastName = document.getElementById('ln').value;
    let patronymic = document.getElementById('pa').value;
    let body = {
        firstName: firstName,
        lastName: lastName,
        patronymic: patronymic
    };
    const response = await fetch('http://localhost:3001/add/addClient', {
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
        var firstName_ = $(row).find("td").eq(1).html();
        var patronymic_ = $(row).find("td").eq(2).html();
        var lastName_ = $(row).find("td").eq(3).html();
        var id_ = $(row).find("td").eq(0).html();
        let body = {
            firstName: firstName_,
            lastName: lastName_,
            patronymic: patronymic_,
            id: id_
        };
        const response = await fetch('http://localhost:3001/update/updateClient', {
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

