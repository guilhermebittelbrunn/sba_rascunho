import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <>
            <h3>Error 404 - page not found</h3>
            <Link to={'/'}>Go to home-page</Link>
        </>
    )
}