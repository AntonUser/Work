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
    var sql = "SELECT id_employee, first_name, last_name, patronymic, post FROM rgr.employee WHERE id_employee=" + id;
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

var getEmployeeByLoginAndPassw = function (callback, login, pswd) {
    var sql = "SELECT id_employee, first_name, last_name, patronymic, post FROM rgr.employee WHERE (login = ? AND password = ?);";
    var object = [login, pswd];
    connection.query(sql, object, function (err, results) {
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

var addCar = function (callback, idCar, Brand, Model, vinNumber, issYear, carcassType, Condition, Killometrage, purchasePrice, Color) {
    //var sql = `INSERT INTO rgr.car (id_car, brand,model, vin_number, iss_year, carcass_type, condition, killometrage, purchase_price, color) VALUES (?,?,?,?,?,?,?,?,?,?);`
    var sql = "INSERT INTO `rgr`.`car` (`id_car`, `brand`, `model`, `vin_number`, `iss_year`, `carcass_type`, `condition`, `killometrage`, `purchase_price`, `color`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    var car = [idCar, Brand, Model, vinNumber, issYear, carcassType, Condition, Killometrage, purchasePrice, Color];
    connection.query(sql, car, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var addSale = function (callback, idSales, idCar, dateSales, idClient, idEmployee, saleValue) {
    var sql = "INSERT INTO `rgr`.`sales` (`id_sales`, `id_car`, `date_sales`, `id_client`, `id_employee`, `sale_value`) VALUES (?, ?, ?, ?, ?, ?);";
    var sale = [idSales, idCar, dateSales, idClient, idEmployee, saleValue];
    connection.query(sql, sale, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}


var dropClient = function (callback, id) {
    //DELETE FROM `rgr`.`client` WHERE (`id_client` = '25');
    var sql = "DELETE FROM `rgr`.`client` WHERE (`id_client` = ?);";
    var i = [id];
    connection.query(sql, i, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var dropArrivalCars = function (callback, id) {
    var sql = "DELETE FROM `rgr`.`arrival_car` WHERE (`id` = ?);";
    var i = [id];
    connection.query(sql, i, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var dropCar = function (callback, id) {
    var sql = "DELETE FROM `rgr`.`car` WHERE (`id_car` = ?);";
    var i = [id];
    connection.query(sql, i, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var dropSale = function (callback, id) {
    var sql = "DELETE FROM `rgr`.`sales` WHERE (`id_sales` = ?);";
    var i = [id];
    connection.query(sql, i, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}


var updateSale = function (callback, idCar, dateSales, idClient, idEmployee, saleValue, id) {
    var sql = "UPDATE `rgr`.`sales` SET `id_car` = ?, `date_sales` = ?, `id_client` = ?, `id_employee` = ?, `sale_value` = ? WHERE (`id_sales` = ?);";
    var object = [idCar, dateSales, idClient, idEmployee, saleValue, id];
    connection.query(sql, object, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var updateArrivalCar = function (callback, idEmployee, addDate, idCar, id) {
    var sql = "UPDATE `rgr`.`arrival_car` SET `id_employee` = ?, `add_date` = ?, `id_car` = ? WHERE (`id` = ?);";
    var object = [idEmployee, addDate, idCar, id];
    connection.query(sql, object, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var updateClient = function (callback, firstName, lastName, patronymic, id) {
    var sql = "UPDATE `rgr`.`client` SET `first_name` = ?, `lastname` = ?, `patronymic` = ? WHERE (`id_client` = ?);";
    var object = [firstName, lastName, patronymic, id];
    connection.query(sql, object, function (err, results) {
        if (err) {
            console.log("error");
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var updateCar = function (callback, Brand, Model, vinNumber, issYear, carcassType, Condition, Killometrage, purchasePrice, Color, id) {
    var sql = "UPDATE `rgr`.`car` SET `brand` = ?, `model` = ?, `vin_number` = ?, `iss_year` = ?, `carcass_type` = ?, `condition` = ?, `killometrage` = ?, `purchase_price` = ?, `color` = ? WHERE (`id_car` = ?);";
    var object = [Brand, Model, vinNumber, issYear, carcassType, Condition, Killometrage, purchasePrice, Color, id];
    connection.query(sql, object, function (err, results) {
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
    getSaleById, getEmployeeByLoginAndPassw, addClient,
    addArrivalCars, addCar,
    addSale, dropArrivalCars,
    dropCar, dropClient,
    dropSale, updateArrivalCar,
    updateClient, updateSale,
    updateCar
};