import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`https://publica.cnpj.ws/cnpj/01358125000150`);
            setInfo(data);
        })();
    }, []);

    return <>{JSON.stringify(info)}</>;
}

export default App;
