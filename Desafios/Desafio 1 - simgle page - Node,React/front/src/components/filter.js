import { useState } from 'react';

function Filter(props) {
    const [option, setOption] = useState('all');

    function changeCollection(e) {
        setOption(e.target.value);
    }

    function searchCards() {
        props.findCollection(option);
    }

    return (
        <>
            <section className="seachProducts">
                <select name="collection" onChange={changeCollection}>
                    <option value="all" name="all">
                        ALL
                    </option>
                    <option value="1A" name="1A">
                        1A
                    </option>
                    <option value="1B" name="1B">
                        1B
                    </option>
                    <option value="2A" name="2A">
                        2A
                    </option>
                    <option value="2B" name="2B">
                        2B
                    </option>
                    <option value="3A" name="3A">
                        3A
                    </option>
                    <option value="3B" name="3B">
                        3B
                    </option>
                </select>
                <button onClick={searchCards}>Search</button>
            </section>
        </>
    );
}

export default Filter;
