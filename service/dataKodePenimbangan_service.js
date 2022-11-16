"use strict"
let response= require("../res/res")
let tabel = require("../conn/tabel")
let config= require("../config/config")


let queryValue= "";

exports.dataPenimbangan = async function( req,res){
    try{
        const {id}= req.params
       
       let queryStr=`SELECT * FROM group_penimbangan gp JOIN detail_order dr ON dr.no_Detail=gp.no_Detailorder 
        JOIN order_pembelian op USING(no_order) JOIN customer c USING(id_customer) 
        WHERE gp.no=${id}`
        await tabel.queryDB(queryStr,queryValue)
        .then(onres => response.ok(onres.rows, 200, res))
    } catch(e){
        response.ok({"message": tabel.GetError(e)},301,res)
    }
}

exports.dataPenimbanganByLevel = async function(req,res){

    try{
        let {id}= req.params
        let queryStr=`SELECT * FROM user WHERE id_user=${id}`
        await tabel.queryDB(queryStr,queryValue)
            .then(async onres => {
                //! pengecekan jumlah user
                if(onres.rows.length < 0){
                    response.ok({"message" : "data user tidak di temukan"},201,res)
                }
                if((onres.rows[0].level === "SUPERVISOR")){
                    let queryStr = `select * from group_penimbangan  order by no desc limit 2000`
                    await tabel.queryDB(queryStr,queryValue).then(onres => response.ok(onres.rows, 200, res))
                }else{
                    let queryStr=`select * from group_penimbangan where idkaryawan=${id} order by no desc limit 30`;
                    await tabel.queryDB(queryStr,queryValue).then(onres => response.ok(onres.rows, 200, res))
                }
            })
            console.log(queryStr)

    }catch(e){
        response.ok({"message": tabel.GetError(e)},301,res)
    }
}

//todo 1 memperbaiki pengecakan supervisor
//todo 2 memperbaiki pengkondisian
