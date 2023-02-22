module.exports = {

    atividades: [
        {
            id: '12345',
            titulo: "caminhar"
        },

        {
            id: '67891',
            titulo: "ler"
        }
    ],

    listarAtividades: function(){
        return this.atividades;
    },

    deletarAtividade: function(id){
        this.atividades = this.atividades.filter((atividade)=>{
            return atividade.id != id;
        })
    },

    adicionarAtividade: function(titulo){
        this.atividades.push({id: createID(), titulo});
    }

    

}

function createID(){
    return Math.random().toString(36).substr(2,9);
}

