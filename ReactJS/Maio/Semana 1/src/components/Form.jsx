import { useParams, useLocation, Link } from "react-router-dom"

export default function Form(){
    const {id} = useParams();
    const location = useLocation();
    return(
        <>
            <form>
                <h3>{id ? 'Update' : 'Create'}</h3>
                <input type="text" name="name" id="name" placeholder="name" value={id}/>
                <input type="password" name="password" id="password" placeholder="password"/>
                <button onClick={(e)=>{
                    e.preventDefault();
                    id ? alert('Update') : alert('Create');
                }}>Send</button>,
            </form>
            <Link to={'/'}>Go to home</Link>
        </>
    )
}