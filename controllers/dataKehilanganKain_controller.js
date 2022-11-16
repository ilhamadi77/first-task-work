"use strict";
const todo = require("../service/dataKehilanganKain_service")

module.exports = function (app) {
   // app.post("/api/identitas/kehilangan",todo.cetakKehilanganIdentitas)
app.get("/dataKehilanganKain/getAllData", todo.getAllKainHilangIdentitas)
app.get("/dataKehilanganKain/getDataById/:id", todo.dataKainHilangById)
app.get("/dataKehilanganKain/getDataKainKosong", todo.getDataKainKosong)
app.get("/dataKehilanganKain/sortKain", todo.sortKainByNama)
app.get("/dataKehilanganKain/sortWarnaKain", todo.sortWarnaKainByWarna)
app.post("/dataKehilanganKain/inputData", todo.addDataKainHilang)
}