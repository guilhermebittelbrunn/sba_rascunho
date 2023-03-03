const socket = io('http://localhost:4000');

socket.on('updateMessages', (messages)=>{
    updateMessagesOnScreen(messages);
})


function updateMessagesOnScreen(messages){
    const sectionMessages = document.getElementById('messages');
    const ul = '<ul>';

    messages.forEach(message=>{
        ul += `<li>${message}</li>`;
    })

    sectionMessages.innerHTML = ul + '</ul>';
}


document.addEventListener('DOMContentLoaded', ()=>{
    let message_form = document.getElementById('message_form');
    message_form.addEventListener('submit', (evento)=>{
        evento.defaultPrevented();
    })
})