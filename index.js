const express = require("express");
const bodyParser = require('body-parser');
const dbHelper = require("./dbHelper");
const fs = require('fs');
const { error } = require("console");
const { v4: uuidv4 } = require('uuid');
// создаем объект приложения
const app = express();
var tokens = new Map();




// Подключаем body-parser
app.use(bodyParser.json());
//для корректной работы сторонних файлов
app.use(express.static(__dirname + '/front-end'));

app.get("/", (request, response) => {
    response.sendFile(__dirname + '/front-end/index.html');
});

app.get("/clients", (request, response) => {
    console.log("/clients")
    if (tokens.has(request.query.token)) {
        response.status(200).sendFile(__dirname + '/front-end/clients.html');
    } else {
        response.status(401).send(`<!DOCTYPE html>
      <html>
      <head>
          <title>Ошибка</title>
          <meta charset="utf-8" />
      </head>
      <body>
          <h1>Вы не авторизованы</h1>
      </body>
      <html>`)
    }
});


app.get("/cars", (request, response) => {
    if (tokens.has(request.query.token)) {
        response.status(200).sendFile(__dirname + '/front-end/cars.html');
    } else {
        response.status(401).send(`<!DOCTYPE html>
      <html>
      <head>
          <title>Ошибка</title>
          <meta charset="utf-8" />
      </head>
      <body>
          <h1>Вы не авторизованы</h1>
      </body>
      <html>`)
    }
});

app.get("/arrivalCars", (request, response) => {
    if (tokens.has(request.query.token)) {
        response.status(200).sendFile(__dirname + '/front-end/arrivalcars.html');
    } else {
        response.status(401).send(`<!DOCTYPE html>
      <html>
      <head>
          <title>Ошибка</title>
          <meta charset="utf-8" />
      </head>
      <body>
          <h1>Вы не авторизованы</h1>
      </body>
      <html>`)
    }
});

app.get("/sales", (request, response) => {
    if (tokens.has(request.query.token)) {
        response.status(200).sendFile(__dirname + '/front-end/sales.html');
    } else {
        response.status(401).send(`<!DOCTYPE html>
      <html>
      <head>
          <title>Ошибка</title>
          <meta charset="utf-8" />
      </head>
      <body>
          <h1>Вы не авторизованы</h1>
      </body>
      <html>`)
    }
});

app.post("/login", (request, response) => {
    const { login, pswd } = request.body;
    dbHelper.getEmployeeByLoginAndPassw(function (err, results) {
        if (err) response.status(400).json(err);
        else {
            if (results.length === 0) {
                response.status(400).json({ 'error': 'неверный логин или пароль' });
            } else {
                let token = uuidv4().toString();
                tokens.set(token, [login.toString(), pswd.toString()]);
                response.status(200).json({ 'token': token });
            }
        }
    }, login, pswd);
});

app.post("/get/getEmployeeByLoginAndPasw", function (request, response) {
    const { login, pswd } = request.body;
    dbHelper.getEmployeeByLoginAndPassw(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, login, pswd);
});
app.post("/get/getClients", function (request, response) {
    dbHelper.getClients(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    });
});

app.post("/get/getArrivalCars", function (request, response) {
    dbHelper.getArrivalCars(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    });
});

app.post("/get/getCars", function (request, response) {
    dbHelper.getCars(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    });
});

app.post("/get/getEmployees", function (request, response) {
    dbHelper.getEmployees(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    });
});

app.post("/get/getSales", function (request, response) {
    dbHelper.getSales(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    });
});

app.post("/get/getClientById", function (request, response) {
    const { id } = request.body;
    dbHelper.getClientById(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, id);
});

app.post("/get/getArrivalCarById", function (request, response) {
    const { id } = request.body;
    dbHelper.getArrivalCarsById(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, id);
});

app.post("/get/getCarById", function (request, response) {
    const { id } = request.body;
    dbHelper.getCarById(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, id);
});

app.post("/get/getEmployeeById", function (request, response) {
    const { id } = request.body;
    dbHelper.getEmployeeById(function (err, results) {
        if (err) { response.status(400).json(err); }
        else response.status(200).json(results);
    }, id);
});

app.post("/get/getSaleById", function (request, response) {
    const { id } = request.body;
    dbHelper.getSaleById(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, id);
});





app.post("/add/addClient", function (request, response) {
    const { firstName, lastName, patronymic } = request.body;
    dbHelper.addClient(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, firstName, lastName, patronymic);
});

app.post("/add/addArrivalCars", function (request, response) {
    const { id, idEmployee, addDate, idCar } = request.body;
    dbHelper.addArrivalCars(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, id, idEmployee, addDate, idCar);
});

app.post("/add/addCar", function (request, response) {
    const { idCar, Brand, Model, vinNumber, issYear, carcassType, Condition, Killometrage, purchasePrice, Color } = request.body;
    dbHelper.addCar(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, idCar, Brand, Model, vinNumber, issYear, carcassType, Condition, Killometrage, purchasePrice, Color);
});

app.post("/add/addSale", function (request, response) {
    const { idSales, idCar, dateSales, idClient, idEmployee, saleValue } = request.body;
    dbHelper.addSale(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, idSales, idCar, dateSales, idClient, idEmployee, saleValue);
});


app.post("/drop/dropArrivalCars", function (request, response) {
    const { id } = request.body;
    dbHelper.dropArrivalCars(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, id);
});

app.post("/drop/dropCar", function (request, response) {
    const { id } = request.body;
    dbHelper.dropCar(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, id);
});

app.post("/drop/dropSale", function (request, response) {
    const { id } = request.body;
    dbHelper.dropSale(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, id);
});

app.post("/drop/dropClient", function (request, response) {
    const { id } = request.body;
    dbHelper.dropClient(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, id);
});


app.post("/update/updateArrivalCars", function (request, response) {
    const { idEmployee, addDate, idCar, id } = request.body;
    dbHelper.updateArrivalCar(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, idEmployee, addDate, idCar, id);
});

app.post("/update/updateSale", function (request, response) {
    const { idCar, dateSales, idClient, idEmployee, saleValue, id } = request.body;
    dbHelper.updateSale(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, idCar, dateSales, idClient, idEmployee, saleValue, id);
});

app.post("/update/updateCar", function (request, response) {
    const { Brand, Model, vinNumber, issYear, carcassType, Condition, Killometrage, purchasePrice, Color, id } = request.body;
    dbHelper.updateCar(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, Brand, Model, vinNumber, issYear, carcassType, Condition, Killometrage, purchasePrice, Color, id);
});

app.post("/update/updateClient", function (request, response) {
    const { firstName, lastName, patronymic, id } = request.body;
    dbHelper.updateClient(function (err, results) {
        if (err) response.status(400).json(err);
        else response.status(200).json(results);
    }, firstName, lastName, patronymic, id);
});

module.exports = app;

app.listen(3001);