import {Container} from 'reactstrap';
import NavMenu from './NavMenu';
import Footer from "./Footer";

export default function Layout(props) {
    return (
        <div style={{backgroundImage: "url(background.png)"}}>
            <NavMenu/>
            <Container>
                {props.children}
            </Container>
            <Footer/>
        </div>
    );
}