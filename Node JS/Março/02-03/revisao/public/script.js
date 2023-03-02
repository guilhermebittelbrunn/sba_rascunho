document.addEventListener('DOMContentLoaded', ()=>{
    showList();
})

function showList(){
    fetch('http://localhost:3000/lista').then(res=>{
        return res.json();
    }).then(data =>{
        let ul = "<ul>";
        for (item of data){
            ul += `<li>${item}</li>`;
        }

        let list = document.getElementById('list');
        list.innerHTML = ul + '</ul>';
    })
}
