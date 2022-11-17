"use strict"
const authJwt = require('../middleware/verifyJwtToken')
const todo = require('../service/dataKodePenimbangan_service');

module.exports = function(app){

    app.get("/kodePenimbangan/getDataByNo/:id",todo.dataPenimbangan)
    app.get("/kodePenimbangan/getDataByLevel/:id",todo.dataPenimbanganByLevel)
    app.post("/kodePenimbangan/getCountDetailOrder",todo.jumlahDataPenimbangan)
}