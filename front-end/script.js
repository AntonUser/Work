const { response } = require("express");

async function fun1() {
    $('form').on('submit', function (e) {//блокировка запроса из формы
        e.preventDefault()
    });

    var strJson = {//обект с данными из формы
        login: $('input[name="login"]').val(),
        pswd: $('input[name="password"]').val()
    };
    query('http://localhost:3001/login', strJson);
}

async function query(url, bodyRequest) {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyRequest)
    });

    if (result.ok) {
        let json = await result.json();

        localStorage.setItem('currentUser', JSON.stringify({ token: json.token }));
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser.token; // your token
        alert(token);////////////////////////
        document.location.replace("http://localhost:3001/clients?token=" + token);
    } else {
        alert("fail")
        document.location.replace("http://localhost:3001/clients");
    }
}
