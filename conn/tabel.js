"use strict";
var connection = require('../conn/conn');
var err = '';

function queryDB(query, queryvalue) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        connection.query(query, queryvalue, function (error, rows, fields) {
          if (error) {
            err = "Error mysql -> " + error + " <- " + this.sql
            reject(err)
          } else {
            resolve({
              rows,
              fields
            })
          }
        })
      }, 0);
    })
  }

  function dumpError(err) {
    if (typeof err === 'object') {
      if (err.message) {
        console.log('\nMessage: ' + err.message)
      }
      if (err.stack) {
        console.log('\nStacktrace:')
        console.log('====================')
        console.log(err.stack);
      }
    } else {
      console.log(err);
    }
  }

  async function starttransaction() {
    await queryDB('START TRANSACTION', '')
      .then(async function () { })
  }
  
  async function commit() {
    await queryDB('COMMIT', '')
      .then(async function () { })
  }
  
  async function rollback() {
    await queryDB('ROLLBACK', '')
      .then(async function () { })
  }

  function GetError(e) {
    dumpError(e)
    let error = e.toString()
    error.substr(0, 11) === "Error mysql" ? error = e : error = e.message
    return error
  }
  
  module.exports = {
    queryDB: queryDB,
    GetError: GetError,
    starttransaction: starttransaction,
    commit: commit,
    rollback: rollback,
   }