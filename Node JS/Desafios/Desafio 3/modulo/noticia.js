module.exports = {
    noticias: [
        {
            id: '12345',
            titulo: 'Acidente em rodovia',
            descricao: 'Acidente ocorre na rodovia br-101'
        }
    ],

    mostrarNoticias: function(){
        return this.noticias;
    },

    adicionarNoticia: function(titulo, descricao){
        this.noticias.push({
            id: criarID(),
            titulo: titulo,
            descricao: descricao
        })
    },

    apagarNoticia: function(id){
        this.noticias = this.noticias.filter((noticia)=>{
            if(noticia.id != id){
                return noticia.id;
            }
        })
    },

    alterarNoticia: function(id){
        this.noticias.forEach((noticia)=>{
            if(noticia.id === id){
                noticia.titulo = "Noticia falsa";
            }
        })
    }

}

function criarID(){
    return Math.random().toString(36).substr(2,9);
}

