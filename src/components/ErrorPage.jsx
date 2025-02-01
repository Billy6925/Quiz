import { useRouteError } from "react-router-dom";
import Navbar from "./Navbar";

function ErrorPage() {
const error = useRouteError();
console.log(error);


return(
    <>
    <header>
       <Navbar/> 
    </header>
    <main>
        <h2>Error</h2>
<h1>Oops! Something went wrong.</h1>
    </main>
    </>
);
}