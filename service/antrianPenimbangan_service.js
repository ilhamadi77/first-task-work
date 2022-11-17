"use strict";
let response = require("../res/res");
let tabel = require("../conn/tabel");

exports.pilihPenimbang = async function (req, res) {
  try {
    let { id } = req.params;
    let queryStr = `select * from v_antrianpenimbanganfix where no_order="${id}"`;
    await tabel.queryDB(queryStr).then(async (onres) => {
      let nama = onres.rows[0];
      if (nama.nama === "" && nama.nama !== nama.karyawan) {
        response.ok(
          {
              "order" : nama.no_order +
              " Sedang dikerjakan oleh " +
              nama.nama +
              " silahkan pilih orderan lain",
              "data" : onres.rows
          },
          200,
          res
        );
      }else{
        let length = onres.rows.length;
        if(length !== 0){
          let queryStr= `select * from detail_order where dikerjakan="SIAP POTONG" and no_order="${id}"`
          await tabel.queryDB(queryStr)
          .then(onres => response.ok(onres.rows,200,res))
        } else {

        }
        console.log(length)
      }
    });
  } catch (e) {
    response.ok({ message: tabel.GetError(e) }, 301, res);
  }
};
