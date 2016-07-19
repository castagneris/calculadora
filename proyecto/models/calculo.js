var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var calculo_schema = new Schema({
  nombre: String,
  calculo: String
});

var Calculo = mongoose.model("Calculo", calculo_schema);

module.exports.Calculo = Calculo;
