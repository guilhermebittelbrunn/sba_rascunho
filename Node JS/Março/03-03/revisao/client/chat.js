const room = window.location.pathname.replace(/\//g, '');
const socket = io('http://localhost:4000/' + room);
let user = null;

socket.on('update_messages', (messages)=>{
    updateScreen(messages);
})

function updateScreen(messages){
    const section_messages = document.getElementById('messages');
    let ul = '<ul>';

    messages.forEach(message=>{
        ul += `<li>${message.user}: ${message.msg}</li>`;
    })

    section_messages.innerHTML = ul + '</ul>';
}

document.addEventListener('DOMContentLoaded', ()=>{
    const message_form = document.getElementById('message_form');
    message_form.addEventListener('submit', (event)=>{
        event.preventDefault();
        if(!user){
            alert('Defina um usuário');
            return
        }
        let input_form_value = document.forms['messages_form_name']['msg'].value;
        document.forms['messages_form_name']['msg'].value = '';
        socket.emit('new_message', {user: user, msg: input_form_value});
    })

    const user_form = document.getElementById('user_form');
    user_form.addEventListener('submit', (event)=>{
        event.preventDefault();
        user = document.forms['user_form']['user'].value;
        user_form.parentNode.removeChild(user_form);
    })
})