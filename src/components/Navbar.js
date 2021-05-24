import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <div>
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="/weather">Weather</Link>
            <Link className="link" to="/restaurant">Restaurant</Link>
        </div>
    );
};
