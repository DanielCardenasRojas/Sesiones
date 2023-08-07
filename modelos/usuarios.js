var Sequelize=require("sequelize");

module.exports=(conexion)=>{
      var UsuarioSchema=conexion.define('usuario',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true},

     nombre:{
        type:Sequelize.STRING

     },
     
     usuario:{
        type:Sequelize.STRING
     },

     password:{
        type:Sequelize.STRING
     },
     
     status:{
        type:Sequelize.BOOLEAN

     },

     createdAt:{
      type:Sequelize.DATE,
      default:("07/08/2023")
   },
   
   updatedAt:{
      type:Sequelize.DATE,
      default:"07/08/2023"
   }

});

return UsuarioSchema;}