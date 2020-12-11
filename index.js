const express = require("express");
const bodyParser = require('body-parser');
const dbHelper = require("./dbHelper");

// создаем объект приложения
const app = express();

// Подключаем body-parser
app.use(bodyParser.json());

/*app.use(express.static(__dirname + '/front-end'));*/
/*
app.get("/", (request, response) => {
    response.sendFile(__dirname + '/public/calculator_320px.html');
});*/

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
module.exports = app;

app.listen(3001);