import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <>
            <p>There's nothing here!</p>
            <Link style={{ color: "white" }} to="/">
                Back to Home
            </Link>
        </>
    )
}



export default NotFound;