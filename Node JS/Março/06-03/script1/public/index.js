// document.addEventListener('DOMContentLoaded', ()=>{
//     let news_form = document.getElementById('news_form');
//     document.addEventListener('submit', (e)=>{
//         e.preventDefault();
//     })
// })

document.addEventListener('DOMContentLoaded', ()=>{
    exibirNoticias();
})

function exibirNoticias(){
    fetch('http://localhost:3000/news/all').then(res=>{
        return res.json();
    }).then(data=>{
        const news_container = document.getElementById('news_container');
        let ul = '';
        data.forEach(element=>{
            ul += `
                    <div class="card" ${element._id}>
                        <div class="header_card">
                            <h3>${element.title}</h3>
                        </div>
                        <div class="body_card">
                            <h3>${element.description}</h3>
                        </div>
                        <div class="footer_card">
                            <h3>create at: ${element.creatAt}</h3>
                            </div>
                    </div>
                `
        })
        news_container.innerHTML = "<h2>Lista de noticias:</h2>" + ul;
    })
}