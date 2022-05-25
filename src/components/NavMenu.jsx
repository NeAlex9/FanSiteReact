import {Container, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NavMenu.css';

export default function NavMenu() {

    return (
        <header>
            <Navbar light className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
                <Container>
                    <div className="d-flex justify-content-between">
                        <NavbarBrand tag={Link} to="/" className="custom-link">Stephen King</NavbarBrand>
                        <div className="me-5 pt-2">
                                You are not log in
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark custom-link" to="/">About author</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark custom-link" to="/works">Works</NavLink>
                            </NavItem>
                        </ul>
                        <ul className="navbar-nav flex-grow me-5">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark custom-link" to="/logIn">Log in</NavLink>
                            </NavItem>
                        </ul>
                    </div>
                </Container>
            </Navbar>
        </header>
    );
}
