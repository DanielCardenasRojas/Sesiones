var ruta=require("express").Router();
var {Usuario}=require("../conexion");
var validator = require("validator");



ruta.get("/nuevoUsuario", (req,res)=>{
     res.render("nuevoUsuario");
});


ruta.post("/nuevoUsuario", (req, res) => {
     var { usuario, nombre, password } = req.body;
   
     // Realizar la validación de los datos
     var errores = [];
     if (!validator.isLength(usuario, { min: 1 })) {
       errores.push("El campo Usuario es requerido.");
     }
   
     if (!validator.isLength(nombre, { min: 1 })) {
       errores.push("El campo Nombre es requerido.");
     }
   
     if (!validator.isLength(password, { min: 1 })) {
       errores.push("El campo Password es requerido.");
     }
   
     // Si hay errores, renderizar el formulario con los mensajes de error
     if (errores.length > 0) {
       return res.render("nuevoUsuario", { errores, usuario, nombre });
     }
   
     // Si no hay errores, crear el nuevo usuario en la base de datos
     Usuario.create({
       usuario: usuario,
       nombre: nombre,
       password: password,
       status: 1,
       // Establecer el campo status a 1
     })
       .then(() => {
         res.redirect("/");
       })
       .catch((err) => {
         console.log("Error al insertar el registro: " + err);
         res.redirect("/");
       });
   });

ruta.get("/modificarUsuario/:id",(req,res)=>{
   Usuario.findByPk(req.params.id)
   .then((usuario)=>{
     res.render("modificarUsuario", {usuario});
   })
   .catch((err)=>{
       console.log("Error............"+err);
       res.redirect("/")
   })
});
ruta.get("/", (req, res) => {
     try {
         Usuario.findAll({ where: { status: 1 } })
             .then((usu) => {
                 res.render("mostrar", { usuarios: usu });
             })
             .catch((err) => {
                 console.log("Error ..........", err);
                 res.render("error", { error: "Error al obtener usuarios de la base de datos." });
             });
     } catch (err) {
         console.log("Error al renderizar la plantilla mostrar: ", err);
         res.render("error", { error: "Error al renderizar la plantilla mostrar." });
     }
 });


ruta.post("/modificarUsuario",(req,res)=>{
     console.log(req.body);c
      Usuario.update(req.body,{where:{id:req.body.id}})
      .then(()=>{})
      .catch((err)=>{
          console.log("Error ..........." +err);
          res.redirect("/");
      })
});

ruta.get("/borradoFisicoUsuario/:id", (req,res)=>{
     Usuario.destroy({where:{id:req.params.id}})
     .then(()=>{
          res.redirect("/");
     })
     .catch((err)=>{
          console.log("Error ..........." +err);
          res.redirect("/");
     })
});


ruta.get("/borradoLogicoUsuario/:id",(req,res)=>{
       Usuario.update({status:0},{where:{id:req.params.id}})
       .then(()=>{
          res.redirect("/");
       })
       .catch((err)=>{
          console.log("Error ..........." +err);
          res.redirect("/");
       })
});

module.exports=ruta;

