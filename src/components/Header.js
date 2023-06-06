import {Link } from 'react-router-dom';
const Header = () => {
    return (
        // wants to set this vertically in the middle of the page
        // <header className="h-14 ">
        // wants to give equal space in between the items


        <header className="h-14 flex justify-around items-center bg-blue-500">
        <Link to="/home"> <h1>home</h1></Link>
        <h2>about</h2>
        <h3>contact</h3>
        </header>
    );
}
export default Header;