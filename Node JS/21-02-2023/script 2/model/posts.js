module.exports = {

    posts: [
        {
            id: 'teste',
            titulo: 'titulo',
            descricao: 'descricao'
        },
    
        {
            id: 'teste2',
            titulo: 'titulo2',
            descricao: 'descricao2'
        },
    
        {
            id: 'teste3',
            titulo: 'titulo3',
            descricao: 'descricao3'
        }
    ],

    getAll(){
        return this.posts;
    },

    newPost(titulo, descricao){
        this.posts.push({id: gerarID(), titulo, descricao})
    }

}

function gerarID(){
    return Math.random().toString(36).substr(2,9);
}