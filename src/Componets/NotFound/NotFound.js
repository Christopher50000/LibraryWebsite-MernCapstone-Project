import "./notFoundImage.css"
import {  Link } from "react-router-dom";


function NotFound() { return <div class="image"><h1 class="errorText">Page is not Found.. Turn Back to the <Link to="/"> HomePage</Link></h1>
</div> }

export default NotFound;