const { request } = require("express");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "non-root",
    database: "rgr",
    password: "123"
});

function connectWithDb() {
    connection.connect(function (err) {
        if (err) {
            return console.error("Ошибка: " + err.message);
        }
        else {
            console.log("Подключение к серверу MySQL успешно установлено");
        }
    });
}

function disConnectWithDb() {
    connection.end(function (err) {
        if (err) {
            return console.log("Ошибка: " + err.message);
        }
        console.log("Подключение закрыто");
    });
}

var getClients = function (callback) {
    var sql = "SELECT * FROM rgr.client;";
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var getArrivalCars = function (callback) {
    var sql = "SELECT * FROM rgr.arrival_car;";
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var getCars = function (callback) {
    var sql = "SELECT * FROM rgr.car;";
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var getEmployees = function (callback) {
    var sql = "SELECT * FROM rgr.employee;";
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var getSales = function (callback) {
    var sql = "SELECT * FROM rgr.sales;";
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var getClientById = function (callback, id) {
    var sql = "SELECT * FROM rgr.client WHERE id_client=" + id;
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var getArrivalCarsById = function (callback, id) {
    var sql = "SELECT * FROM rgr.arrival_car WHERE id=" + id;
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var getCarById = function (callback, id) {
    var sql = "SELECT * FROM rgr.car WHERE id_car=" + id;
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var getEmployeeById = function (callback, id) {
    var sql = "SELECT * FROM rgr.employee WHERE id_employee=" + id;
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var getSaleById = function (callback, id) {
    var sql = "SELECT * FROM rgr.sales WHERE id_sales=" + id;
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var addClient = function (callback, firstName, lastName, patronymic) {
    var sql = `INSERT INTO rgr.client (first_name, lastname, patronymic) VALUES ("${firstName}","${lastName}","${patronymic}");`;
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var addArrivalCars = function (callback, id, idEmployee, addDate, idCar) {
    //INSERT INTO `rgr`.`arrival_car` (`id_employee`, `add_date`, `id_car`) VALUES ('3', '2020-04-21', '20');
    var sql = `INSERT INTO rgr.arrival_car (id, id_employee, add_date, id_car) VALUES ("${id}","${idEmployee}","${addDate}","${idCar}");`;
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var addCar = function (callback, firstName, lastName, patronymic) {
    var sql = `INSERT INTO rgr.client (first_name, lastname, patronymic) VALUES ("${firstName}","${lastName}","${patronymic}");`;
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var addEmployee = function (callback, firstName, lastName, patronymic) {
    var sql = `INSERT INTO rgr.client (first_name, lastname, patronymic) VALUES ("${firstName}","${lastName}","${patronymic}");`;
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var addSale = function (callback, firstName, lastName, patronymic) {
    var sql = `INSERT INTO rgr.client (first_name, lastname, patronymic) VALUES ("${firstName}","${lastName}","${patronymic}");`;
    connection.query(sql, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}
module.exports = {
    connectWithDb, disConnectWithDb,
    getClients, getArrivalCars,
    getCars, getEmployees,
    getEmployees, getSales,
    getClientById, getArrivalCarsById,
    getCarById, getEmployeeById,
    getSaleById, addClient,
    addArrivalCars
};