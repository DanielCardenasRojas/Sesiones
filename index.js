var express=require("express");

var path=require("path");
var usuariosRutas=require("./rutas/usuarios");

var session=require("express-session");

require("dotenv").config();

var app=express();
app.set("view engine","ejs");
app.set("/web", express.static(path.join(__dirname,"web")));

app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:process.env.SECRETO_SESION,
    resave:true,
    saveUninitialized:true
}));

app.use("/",usuariosRutas);

var port=process.env.PORT || 3000;

app.listen(port, ()=>{
   console.log("Servidor en http://localhost:"+port);
});