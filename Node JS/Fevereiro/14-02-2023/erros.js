//Método 1 

let erros = {
    problem: function(error){
        if (error)throw (error);
        console.log("Ação realizada com sucesso");
    },
    leitura: function(error, data){
        if (error){throw (error)}
       console.log(data);
    }
}

module.exports = erros;



//Método 2 

//  module.exports.problem = function(error){
//      if (error) throw (error);
//      console.log("Ação realizada com sucesso");
//  }   

//  module.exports.leitura = function(error,data){
//      if (error) throw (error);
//     console.log(data);
//  }   


