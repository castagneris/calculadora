var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//mongoose.connect("mongodb://localhost/fotos");
mongoose.connect("mongodb://localhost/calculos");

//var userSchemaJSON = {
//  email: String,
//  password: String
//};
var calculoSchemaJSON = {
  nombre: String,
  calculo: String
};

//var user_schema = new Schema(userSchemaJSON);
var calculo_schema = new Schema(calculoSchemaJSON);

var Calculo = mongoose.model("Calculo",calculo_schema);





app.use(express.static('public'));
app.use(bodyParser.json()); // para peticiones application/json
app.use(bodyParser.urlencoded({extended: true})); //lo que hace el extend es decir q algoritmo usa
app.set("view engine", "jade");

app.get("/", function(req, res){
  res.render("index");
});

app.get("/app", function(req, res){
  res.render("index");
});

app.get("/calculadora", function(req, res){
      res.render("calculadora");
  });



app.get("/busqueda", function(req, res){
//  Calculo.find().byName({nombre: req.body.nombreSesion}).exec(function(err, calculo) {
  //  console.log(calculo);
  res.render("busqueda");
  });
//  });


app.post("/sesioncalculo", function(req, res){
  Calculo.findOne({nombre:req.body.nombreSesion},function(err,docs){
    if (!docs) {
      return res.send('No se ha guardado un calculo con el nombre: '+req.body.nombreSesion)
    } else {
    res.send(docs.calculo+" = "+eval(docs.calculo))};

  });
});

//app.post("/users", function(req, res){
//  var user = new User({email: req.body.email, password: req.body.password});
//  user.save(function(){
//      res.send("recibimos tus datos");
//  });

app.post("/calculo", function(req, res){
  var calculo = new Calculo({nombre: req.body.nombreSesion, calculo: req.body.expresion});
  calculo.save(function(){
      res.send("recibimos tu calculo");
  });
});

  //console.log("Contraseña: "+ req.body.password);
//  console.log("Email: "+ req.body.email);




app.listen(8080);
