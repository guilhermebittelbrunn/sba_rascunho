import countReducer from './reducer/countReducer';
import { useSelector } from 'react-redux';

function Header() {
    const contator = useSelector((state) => {
        return state;
    });
    return (
        <>
            <header>
                <h2>Contador: {contator}</h2>
            </header>
        </>
    );
}
export default Header;
