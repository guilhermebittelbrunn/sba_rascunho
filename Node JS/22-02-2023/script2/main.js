let url = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}';


fetch (url).then(res=>{
    return res.json();
}).then(data=>{
    console.log(data);
})


