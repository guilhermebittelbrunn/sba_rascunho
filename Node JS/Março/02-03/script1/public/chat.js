const socket = io('http://localhost:3000');

socket.on('update_messages', (messages)=>{

    updateMessagesOnScreen(messages);
    
})


function updateMessagesOnScreen(messages){
    const div_messages = document.getElementById('messages');
    let list_messages = '<ul>';

    messages.forEach(message=>{
        list_messages += `<li>${message}</li>`;
    })

    div_messages.innerHTML = list_messages + '</ul>';
}

document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('message_form');
    form.addEventListener('submit', (evento)=>{
        evento.preventDefault();
        const message = document.forms['messages_form_name']['msg'].value;
        document.forms['messages_form_name']['msg'].value = '';
        socket.emit('new_message', {msg: message});
    })
})

