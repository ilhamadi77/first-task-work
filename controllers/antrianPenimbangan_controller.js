"use strict";
const todo = require("../service/antrianPenimbangan_service")

module.exports= function(app){
  app.get("/antrianPenimbangan/getDataById/:id",todo.pilihPenimbang)
}