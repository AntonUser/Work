
async function fun1() {
    /*   $('form').on('submit', function (e) {//блокировка запроса из формы
           e.preventDefault()
       });*/
    //обект с данными из формы
    var strJson = {
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
        document.location.replace("http://localhost:3001/clients?token=" + json.token);
    } else {
        alert("fail")
        document.location.replace("http://localhost:3001/clients");
    }
}
