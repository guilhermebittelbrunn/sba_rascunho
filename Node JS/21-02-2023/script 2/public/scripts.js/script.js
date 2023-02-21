
document.addEventListener('DOMContentLoaded', () => {
    uptadtePosts();
})

function uptadtePosts() {

    fetch("http://localhost:3000/api/all").then(res => {
        return res.json();
    }).then(json => {
        let postElements = '';
        let posts = JSON.parse(json);
        posts.forEach((post) => {
            let postElement = 
            `<div id =${post.id} class="Card">
                <div class="header">
                    <h3 class="titulo">${post.titulo}</h3>
            </div>
            <div class="body"> 
                <div class="descricao">
                    <p>${post.descricao}</p>
                </div>
            </div>
        </div>`
        postElements += postElement;
        })
        
        document.getElementById("mural").innerHTML = postElements;

    })


}

function newPost() {

    let titulo = document.getElementById('title').value;
    let descricao = document.getElementById('description').value;
   

    let post = {
        titulo, descricao
    }


    const options = {
        method:"POST",
        headers: new Headers({'content-type' : 'application/json'}),
        body: JSON.stringify(post)
    }

    fetch("http://localhost:3000/api/new", options).then(res=>{
        uptadtePosts();
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    })

}