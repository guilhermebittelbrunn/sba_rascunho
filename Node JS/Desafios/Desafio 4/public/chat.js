const room = window.location.pathname.replace(/\//g, '');
const socket = io('http://localhost:3000/' + room);
let user = null;

socket.on('updateMessages', (messages)=>{
    updateScreen(messages);
})

function updateScreen(messages){
    const messages_section = document.getElementById('messages_section');
    let ul = '<ul>';

    messages.forEach(message=>{
        ul += `<li>${message.user}:${message.msg}</li>`
    });
    messages_section.innerHTML = ul + "</ul>";
}

document.addEventListener('DOMContentLoaded', ()=>{
    const form_user = document.getElementById('form_user');
    form_messages.addEventListener('submit', (event)=>{
        event.preventDefault();
        if(!user){
            alert('Identifique-se');
            return;
        }
        const form_input_value = document.forms['form_messages']['msg'].value;
        document.forms['form_messages']['msg'].value = '';
        console.log(user,  form_input_value)
        socket.emit('newMessage', {user: user, msg: form_input_value});
    })
    form_user.addEventListener('submit', (event)=>{
        event.preventDefault();
        user = document.forms['form_user_name']['user'].value;
        document.forms['form_user_name']['user'].value = '';
        form_user.style.display = 'none';
    })
})