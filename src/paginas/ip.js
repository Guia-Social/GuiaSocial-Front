// En este documento se guarda la ip del ordenador, esto es porque para acceder a la base de datos Mongo se debe de usar la ip local,
// la cosa es que esta ip cambia con el tiempo y no es estatica, por eso almacenamos la ip en un documento, lo que nos permite cambiar
// todas las ips de todas las consulatas desde aquí.

const CONFIG = {
    IP: "192.168.207.73",
  };
  
  export default CONFIG;
  