module.exports = {

    noticias: [
        {
            id: '12345',
            titulo: 'Acidente',
            descricao: 'Acidente de carro ocorre em rodovia'
        },
        {
            id: '67891',
            titulo: 'Resgate',
            descricao: 'Resgate ocorre em rodovia'
        }
    ],
    
    MostrarNoticias: function(){
        return this.noticias;
    },

    AdicionarNoticia: function(titulo, descricao){

        this.noticias.push({
            id: CriarID(),
            titulo: titulo,
            descricao: descricao
        })

    },

    AtualizarNoticia: function(id){
        this.noticias.forEach((noticia)=>{
            if(noticia.id == id){
                noticia.titulo = "Noticia antiga";
            }
        })
    },

    ApagarNoticia: function(id){
        this.noticias = this.noticias.filter((noticia)=>{
            return noticia.id != id;
        })
    },

}

function CriarID(){
    return Math.random().toString(36).substr(2,9);
}
