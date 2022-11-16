"use strict";
const tabel = require("../conn/tabel");

exports.ok = function (values, status, res) {
  const data = {
    'status': status,
    'values': values
  };
  res.json(data);
  res.end();
};
