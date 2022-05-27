import {Container, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom';
import './NavMenu.css';
import {useSelector, useDispatch} from "react-redux";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {useState} from "react";
import {Menu, MenuItem} from "@mui/material";
import {deepOrange} from '@mui/material/colors';
import {logOutThunk} from "../features/authSlice";


export default function NavMenu() {

    const auth = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOutHandler = async ()=>{
        dispatch(logOutThunk());
    }

    const settings = ["Account", "Logout"];
    const settingComponents = [
        <NavLink tag={Link} className="text-dark custom-link" to="/account">{settings[0]}</NavLink>,
        <NavLink tag={Link} onClick={logOutHandler} className="text-dark custom-link" to={"#"}>{settings[1]}</NavLink>,
    ]

    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const authHeader = () => {
        if (auth.isLogged) {
            return (
                <div className="d-flex flex-row align-content-center">
                    <span style={{paddingTop: "0.9rem", paddingRight: "1rem"}}>Hello, {auth.user.name}!</span>
                    <IconButton style={{paddingTop: "0.35rem"}} onClick={handleOpenUserMenu} sx={{p: 0}}>
                        <Avatar sx={{bgcolor: deepOrange[400]}}>
                            {auth.user.name[0].toUpperCase()}
                        </Avatar>
                    </IconButton>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting, index) => (
                            <MenuItem key={setting[0]} onClick={handleCloseUserMenu}>
                                {settingComponents[index]}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            );
        } else {
            return (
                <div className="me-5 pt-2">
                    You are not log in
                </div>);
        }
    }

    return (
        <header>
            <Navbar light className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
                <Container>
                    <div className="d-flex justify-content-between">
                        <NavbarBrand tag={Link} to="/" className="custom-link">Stephen King</NavbarBrand>
                        {authHeader()}
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
                            {auth.isLogged ?
                                "" :
                                (<NavItem>
                                    <NavLink tag={Link} className="text-dark custom-link" to="/logIn">Log in</NavLink>
                                </NavItem>)}
                        </ul>
                    </div>
                </Container>
            </Navbar>
        </header>
    );
}
