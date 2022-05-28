import {useLocation, NavLink} from "react-router-dom";
import '../../../NavMenu.css';

export function CustomLink({to, ...props}) {
    let location = useLocation();
    return <NavLink className="custom-link" to={to + location.search} {...props} />;
}