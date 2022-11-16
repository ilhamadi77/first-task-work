"use strict";
const response = require("../res/res");
const tabel = require("../conn/tabel");
let queryValue = "";

exports.getAllKainHilangIdentitas = async function (req, res) {
  try {
    let queryStr = `select *,concat(berat,'Kg') as brt from n_kainhilangidentitas WHERE NO NOT IN (SELECT no_tanpaidentitas FROM n_pemasangankainhilang)`;
    await tabel
      .queryDB(queryStr, queryValue)
      .then((onres) => response.ok(onres.rows, 200, res));
  } catch (e) {
    response.ok({ messsage: tabel.GetError(e) }, 300, res);
  }
};

exports.addDataKainHilang = async function (req, res) {
  try {
    const no_roll = req.body.no_roll;
    const nama_kain = req.body.nama_kain;
    const warna = req.body.warna;
    const lebar = req.body.lebar;
    const lot = req.body.lot;
    const berat = req.body.berat;
    const id_user = req.body.id_user;
    const jenis_trx = req.body.jenis_trx;
    const no = req.body.no;
    if (jenis_trx === "simpan") {
      let queryStr = `insert into n_kainhilangidentitas (no_roll,nama_kain,warna,lebar,lot,berat,id_user) values (?, ?, ?, ?, ?, ?,?)`;
      let queryValue = [no_roll, nama_kain, warna, lebar, lot, berat, id_user];
      await tabel.queryDB(queryStr, queryValue);
      if (queryStr) {
        let query = `select max(no) as no from n_kainhilangidentitas`;
        await tabel.queryDB(query, queryValue).then((onres) =>
          response.ok(
            {
              message: "sukses",
              no: onres.rows[0].no,
            },
            200,
            res
          )
        );
      }
      console.log(req.body)
    } else {
      let queryStr = `select * from n_kainhilangidentitas where no_roll=?`;
      let queryValue = [no_roll];
      await tabel.queryDB(queryStr, queryValue).then(async (onres) => {
        if (onres.rows.length === 0) {
          response.ok(
            { message: "Data tidak ada, silahkan refresh!", no: onres },
            200,
            res
          );
        } else {
          let queryStr = `update n_kainhilangidentitas set nama_kain=?, warna=?, lebar=?,lot=?, berat=?, id_user=? where no=?`;
          let queryValue = [nama_kain, warna, lebar, lot, berat, id_user, no];
          await tabel
            .queryDB(queryStr, queryValue)
            .then((onres) => response.ok({ message: "sukses" }, 200, res));
        }
      });
    }
  } catch (e) {
    response.ok({ message: tabel.GetError(e) }, 300, res);
  }
};

exports.dataKainHilangById = async function (req, res) {
  try {
    let { id } = req.params;
    let queryStr = `select *,concat(berat,'Kg') as brt from n_kainhilangidentitas where no=${id}`;
    await tabel
      .queryDB(queryStr, queryValue)
      .then((onres) => response.ok(onres.rows, 200, res));
  } catch (e) {
    response.ok({ message: tabel.GetError(e) }, 300, res);
  }
};

exports.getDataKainKosong = async function (req, res) {
  try {
    let queryStr = `SELECT IFNULL(MAX(lot),'kosong') AS lot FROM n_kainhilangidentitas WHERE LENGTH(lot)=4 AND lot LIKE 'C%'`;
    await tabel
      .queryDB(queryStr, queryValue)
      .then((onres) => response.ok(onres.rows, 200, res));
  } catch (e) {
    response.ok({ message: tabel.GetError(e) }, 300, res);
  }
};

exports.sortKainByNama = async function (req, res) {
  try {
    let queryStr = `select nama_kain from kain order by nama_kain`;
    await tabel
      .queryDB(queryStr, queryValue)
      .then((onres) => response.ok(onres.rows, 200, res));
  } catch (e) {
    response.ok({ message: tabel.GetError(e) }, 300, res);
  }
};

exports.sortWarnaKainByWarna = async function (req,res){
  try{
    let queryStr = `select jenis_warna from warna order by jenis_warna`;
    await tabel.queryDB(queryStr,queryValue).then((onres)=>response.ok(onres.rows,200, res))

  } catch(e){
    response.ok({ message: tabel.GetError(e) }, 300, res);
  }
}

exports.deleteDataKain = async function(req,res){
  try{
    let {id}= req.params.id

  }catch(e){
    response.ok({ message: tabel.GetError(e) }, 300, res);
  }
}