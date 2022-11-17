"use strict";
let response = require("../res/res");
let tabel = require("../conn/tabel");

let queryValue = "";

exports.dataPenimbangan = async function (req, res) {
  try {
    const { id } = req.params;

    let queryStr = `SELECT * FROM group_penimbangan gp JOIN detail_order dr ON dr.no_Detail=gp.no_Detailorder 
        JOIN order_pembelian op USING(no_order) JOIN customer c USING(id_customer) 
        WHERE gp.no=${id}`;
    await tabel
      .queryDB(queryStr, queryValue)
      .then((onres) => response.ok(onres.rows, 200, res));
  } catch (e) {
    response.ok({ message: tabel.GetError(e) }, 301, res);
  }
};

exports.dataPenimbanganByLevel = async function (req, res) {
  try {
    let { id } = req.params;
    let queryStr = `SELECT level FROM user WHERE id_user=${id}`;
    await tabel.queryDB(queryStr, queryValue).then(async (onres) => {
      if (onres.rows.length > 0) {
        let level = onres.rows[0].level;
        if (level === "SUPERVISOR") {
          let queryStr = `select * from group_penimbangan  order by no desc limit 2000`;
          await tabel
            .queryDB(queryStr, queryValue)
            .then((onres) => response.ok(onres.rows, 200, res));
        } else {
          let queryStr = `select * from group_penimbangan where idkaryawan=${id} order by no desc limit 30`;
          await tabel
            .queryDB(queryStr, queryValue)
            .then((onres) => response.ok(onres.rows, 200, res));
        }
      } else {
        response.ok({ message: "user tidak terdaftar" }, 201, res);
      }
    });
  } catch (e) {
    response.ok({ message: tabel.GetError(e) }, 301, res);
  }
};

exports.jumlahDataPenimbangan = async function (req, res) {
  try {
    let no_order = req.body.no_order;
    let roll2 = req.body.roll2;
    let queryStr = `SELECT COUNT(DISTINCT NO) AS total,IFNULL(((SELECT COUNT(DISTINCT NO) FROM detail_order JOIN group_penimbangan ON no_detail=no_detailorder 
   WHERE no_order=? AND NO <= (SELECT NO FROM detail_order JOIN group_penimbangan ON no_detail=no_detailorder
   WHERE no_order=? AND roll2=? ))),0) AS dari FROM detail_order JOIN perincian_order USING(no_detail) 
   WHERE no_order=? AND jenis_quantity="KGAN"`;

    let queryValue = [no_order, no_order, roll2, no_order];

    await tabel
      .queryDB(queryStr, queryValue)
      .then((onres) => response.ok(onres.rows, 200, res));
  } catch (e) {
    response.ok({ message: tabel.GetError(e) }, 301, res);
  }
};
